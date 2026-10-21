function changeTheme() {
    const btn = document.querySelector('button');
    const doc = document.getElementById('doc');
    const lightMode = doc.classList.contains('light');

    btn.addEventListener('click', () => {
        doc.classList.toggle('light');
        doc.classList.toggle('dark');
    });
};

class products {
    constructor() {
        this.productsJSON = 'http://localhost:3000/api/products';
        this.productsClass = document.querySelector('products');
    }

    async getProducts() {
        const response = await fetch(this.productsJSON);
        return response.json();
    }

    showProcducts(products) {
    
    }
}
changeTheme();

