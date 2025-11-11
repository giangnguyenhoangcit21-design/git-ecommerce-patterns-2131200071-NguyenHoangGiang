import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.
        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        // 2. If they are, process the payment using `paymentService.processPayment()`.
        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        // 4. Log the result of each step. If a step fails, log it and stop.

        console.log('[Facade] Starting order process...');

        // 1. Check stock
        const stockOk = this.inventoryService.checkStock(orderDetails.productIds);

        // 4. Log and stop on failure
        if (!stockOk) {
            console.log('[Facade] Stock check failed. Aborting order.');
            return false;
        }

        // 2. Process payment
        const paymentOk = this.paymentService.processPayment(
            orderDetails.userId,
            orderDetails.amount
        );

        // 4. Log and stop on failure
        if (!paymentOk) {
            console.log('[Facade] Payment failed. Aborting order.');
            // In a real app, we might need to roll back the stock reservation
            return false;
        }

        // 3. Arrange shipping
        const shippingResult = this.shippingService.arrangeShipping(
            orderDetails.userId,
            orderDetails.shippingInfo
        );

        // 4. Log and stop on failure (check for a valid result object)
        if (!shippingResult || !shippingResult.trackingId) {
            console.log('[Facade] Shipping arrangement failed. Aborting order.');
            // In a real app, we would roll back the payment
            return false;
        }

        // All steps successful
        console.log(`[Facade] Order placed successfully! Tracking ID: ${shippingResult.trackingId}`);
        return true;
    }
}

export { CheckoutFacade };