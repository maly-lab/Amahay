const express = require('express');
const router = express.Router();

const products = [ // creates product (in json format) 
    { id: 0, item_name: "PANASONIC Z95B 55-inch OLED 4K HDR Smart Fire TV with Freely (TV-55Z95BEB)",img: 'https://media.currys.biz/i/currysprod/10284833?$l-large$&fmt=auto', category: "Television", price: 1699.0, stock: 5},
    { id: 1, item_name: "BUYSIGHT Rechargeable Spotlight Flashlight, 1,000,000 lumens, Graphite Black-COB (006-COB)", img:'https://m.media-amazon.com/images/I/71zZmXUeHKL._AC_SL1500_.jpg' ,category: "Flashlight", price: 40.54, stock: 5},
    { id: 2, item_name: "Skechers S-Lights Enchanted Heart Lights, Lavender / Multi", img: 'https://images.skechers.com/image;width=900%2Cformat=auto/303266_LVMT_GIF', category: "Shoes", price: 38.0, stock: 5},
    { id: 3, item_name: "1994 Mazda MX-5 Miata", img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbringatrailer.com%2Fwp-content%2Fuploads%2F2023%2F01%2F1994_mazda_mx-5-miata_1994_mazda_mx-5-miata_90cc76f7-5f1d-4322-a9d3-805178998e04-f2BbKn-23643-23644-scaled.jpg%3Fw%3D2048&f=1&nofb=1&ipt=64ebeb724c549025d58bd7ce9f682576a61742f4ee65bb717e19a1b18c98fe4a&ipo=images',category: "Car", price: 20000, stock: 5},
    { id: 4, item_name: "DMI Gaming PC, Ryzen 5 5500, RTX 3050 6GB, 16GB DDR4, 1TB NVMe, Wi-Fi, Windows 11",img: 'https://m.media-amazon.com/images/I/71Z8bFx0PRL._AC_SL1440_.jpg', category: "Desktop Computer", price: 699.99, stock: 5},
    { id: 5, item_name: "MAONO DGM20S White USB Gaming Microphone",img: 'https://m.media-amazon.com/images/I/71dm8HKiEHL._AC_SL1500_.jpg', category: "Microphone", price: 45.99, stock: 5},
    { id: 6, item_name: "Furby Galaxy Glow in the Dark Interactive Plush Toy",img: 'https://m.media-amazon.com/images/I/71adfhnOF+L._AC_SL1500_.jpg', category: "Interactive Toy", price: 0.0, stock: 5},
    { id: 7, item_name: "Matte Black Paint", img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fres.cloudinary.com%2Fdnljxwaxk%2Fimage%2Fupload%2Fv1708037129%2FKimball%2520Hospitality%2FMaterials%2FMetals%2FMatte-Black-MB_2.jpg&f=1&nofb=1&ipt=71de64dbc86eb5958afada9850432eded6d20d6b42cc45d003cc5a621fe7c369&ipo=images',category: "Paint", price: 30, stock: 5}    
];

let nextId = products.length; // sets the next id to the length of the products array

/**
 * Parses the ID from a string value.
 * @param {*} value - The value to parse.
 * @returns {number|null} - The parsed ID or null if invalid.
 */
function parseId(value) {
    const id = Number(value); // converts the value to a number
    return Number.isInteger(id) ? id : null; // returns the id if it is an integer otherwise returns null
}

/** 
 * Handles the retrieval of all products or filtered products based on query parameters.
 * @param {Object} req - The request object containing query parameters.
 * @param {Object} res - The response object used to send back the filtered products or an error message.
 */
router.get('/', (req, res) => {
    let result = [...products]; // creates a copy of the products array to avoid modifying the original data

    const { category, name, maxPrice, stock } = req.query;

    if (category) {
        result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (name) {
        result = result.filter(p => p.item_name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    }

    if (maxPrice !== undefined) {
        const limit = Number(maxPrice);
        if (isNaN(limit)) {
            return res.status(400).json({ error: 'Invalid maxPrice value' });
        }
        result = result.filter(p => p.price <= limit);
    }

    if (stock !== undefined) {
        result = result.filter(p => p.stock === parseInt(stock));
    }

    res.json(result);
});

/**
 * Handles the retrieval of a specific product by its ID.
 * Validates the ID and returns the product if found, or an error message if not.
 * @param {Object} req - The request object containing the product ID in req.params.id.
 * @param {Object} res - The response object used to send back the product or an error message.
 */
router.get('/:id', (req, res) => {
    const id = parseId(req.params.id);
    if (id === null) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    return res.json(product);
});

/**
 * Handles the creation of a new product.
 * Validates the input data and adds the new product to the products array.
 * @param {Object} req - The request object containing the new product data in req.body.
 * @param {Object} res - The response object used to send back the created product or an error message.
 */
router.post('/', (req, res) => {
    const { name, category, price, stock = 0, img} = req.body ?? {};

    // checks that the new item has valid data
    if (typeof name !== 'string' || name.trim() === '') {return res.status(400).json({ error: 'Product name is required' });};
    if (typeof category !== 'string' || category.trim() === '') {return res.status(400).json({ error: 'Product category is required' });};
    if (typeof price !== 'number' || price < 0) { return res.status(400).json({ error: 'Product price is required and must be a positive number' });};
    if (typeof stock !== 'number' || stock < 0) { return res.status(400).json({ error: 'Product stock is required and must be a positive number' });};
    if (typeof img !== 'string') { return res.status(400).json({ error: 'Product image must be a string to the url' });};

    // creates the new product with its details
    const product = {
        id: nextId++,
        item_name: name.trim(),
        category: category.trim(),
        price,
        stock,
        img: img || null
    };
    products.push(product); // adds the new product to the products array

    res.status(201).json(product); // sets the status code to 201 (created) and returns the new product as a JSON response
});

module.exports = router; // makes entire file available to server.js