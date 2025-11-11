// TODO: Implement the Singleton pattern.
// 1. Create a variable `instance` to hold the single instance of the class.
let instance;

// 2. In the constructor, check if `instance` already exists.
// 3. If it exists, return `instance`.
// 4. If it does not exist, initialize the class properties (like `this.products`)
//    and assign the new instance to `instance`.
// 5. Export the class.

class CartService {
    constructor() {
        // 2. Check if `instance` already exists
        if (instance) {
            // 3. If it exists, return `instance`
            return instance;
        }

        // 4. If it does not exist, initialize and assign
        this.products = [];
        instance = this;
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(productId) {
        this.products = this.products.filter(p => p.id !== productId);
    }

    getProducts() {
        return this.products;
    }
}

export { CartService };