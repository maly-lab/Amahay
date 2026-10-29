/**
 * Toggles the theme of the web page between light and dark mode.
 */
function changeTheme() {
    const btn = document.querySelector('button');

    btn.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
        document.documentElement.classList.toggle('dark');
    });
};

/**
 * class productViewer is responsible for fetching and displaying products from the API.
 */
class productViewer {
    constructor() { // Initializes the productViewer instance.
        this.productsFile = 'http://localhost:3000/api/products';
        this.list = document.querySelector('#products');
    }

    /**
     * Gets the list of products from the products API.
     * @returns {JSON} - An array containing the product information.
     * @throws {Error} - If the fetch request fails or the response is not ok.
     */
    async getProducts() {
        const response = await fetch(this.productsFile);

        if (!response.ok) { //checks the response status and throws an error if it's not ok
            throw new Error(`Products file returned ${response.status}`);
        }

        return response.json(); //returns the parsed JSON data from the response
    }

    /**
     * Displays the list of products on the page.
     * @param {Array} products - An array of product objects to display.
     */
    showProducts(products) {
        this.list.replaceChildren();

        if (products.length === 0) { //checks if there are any products to display
            return;
        }

        for (const product of products) { // for each product in the array
            const itemInfo = document.createElement('li');

            const name = document.createElement('h2');
            name.textContent = product.item_name || 'Unnamed product';
            itemInfo.append(name);

            if (product.category) {
                const category = document.createElement('p');
                category.textContent = product.category;
                itemInfo.append(category);
            }

            if (product.stock !== undefined && product.stock !== null) {
                const stock = document.createElement('p');

                if (product.stock > 0) {
                    stock.textContent = `Stock: ${product.stock}`;
                } else {
                    stock.textContent = 'Out of Stock';
                }

                itemInfo.append(stock);
            }

            if (product.price !== undefined && product.price !== null) {
                const price = document.createElement('p');
                price.textContent = `Price: £${product.price.toFixed(2)}`;
                itemInfo.append(price);
            }

            this.list.append(itemInfo);
        }
    }

    /**
     * Loads the products and displays them on the page.
     * Shows an error message if loading fails.
     */
    async loadProducts() {
        try {
            this.showProducts(await this.getProducts());
        } catch (error) {
            this.list.textContent = 'An error occurred while loading the products. Please try again later.';
            console.error(error);
        }
    }
}

productViewer.loadProducts();
changeTheme();

