/**
 * backend database for the website
 */

const express = require('express') //loads express library
const app = express() // creates server application (here we add routes)
const PORT = process.env.PORT || 3000 // tries to use a local PORT if one exisits otherwise is set to 3000

app.listen( PORT, () => {
    console.log(`Amahay backend is running at local http://localhost:${PORT}`) // logs url to terminal if the site is running
});

const products = [ // creates product (in json format) 
    { id: 0, item_name: "PANASONIC Z95B 55-inch OLED 4K HDR Smart Fire TV with Freely (TV-55Z95BEB)",img: 'https://media.currys.biz/i/currysprod/10284833?$l-large$&fmt=auto', category: "Television", price: 1699.0, stock: 5},
    { id: 1, item_name: "BUYSIGHT Rechargeable Spotlight Flashlight, 1,000,000 lumens, Graphite Black-COB (006-COB)", img:'https://m.media-amazon.com/images/I/71zZmXUeHKL._AC_SL1500_.jpg' ,category: "Flashlight", price: 40.54, stock: 5},
    { id: 2, item_name: "Skechers S-Lights Enchanted Heart Lights, Lavender / Multi", img: 'https://images.skechers.com/image;width=900%2Cformat=auto/303266_LVMT_GIF', category: "Shoes", price: 38.0, stock: 5},
    { id: 3, item_name: "1994 Mazda MX-5 Miata", img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbringatrailer.com%2Fwp-content%2Fuploads%2F2023%2F01%2F1994_mazda_mx-5-miata_1994_mazda_mx-5-miata_90cc76f7-5f1d-4322-a9d3-805178998e04-f2BbKn-23643-23644-scaled.jpg%3Fw%3D2048&f=1&nofb=1&ipt=64ebeb724c549025d58bd7ce9f682576a61742f4ee65bb717e19a1b18c98fe4a&ipo=images',category: "Car", price: 20000, stock: 5},
    { id: 4, item_name: "DMI Gaming PC, Ryzen 5 5500, RTX 3050 6GB, 16GB DDR4, 1TB NVMe, Wi-Fi, Windows 11",img: 'https://m.media-amazon.com/images/I/71Z8bFx0PRL._AC_SL1440_.jpg', category: "Desktop Computer", price: null, stock: 5},
    { id: 5, item_name: "MAONO DGM20S White USB Gaming Microphone",img: 'https://m.media-amazon.com/images/I/71dm8HKiEHL._AC_SL1500_.jpg', category: "Microphone", price: 45.99, stock: 5},
    { id: 6, item_name: "Furby Galaxy Glow in the Dark Interactive Plush Toy",img: 'https://m.media-amazon.com/images/I/71adfhnOF+L._AC_SL1500_.jpg', category: "Interactive Toy", price: 0.0, stock: 5},
    { id: 7, item_name: "Matte Black Paint", img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fres.cloudinary.com%2Fdnljxwaxk%2Fimage%2Fupload%2Fv1708037129%2FKimball%2520Hospitality%2FMaterials%2FMetals%2FMatte-Black-MB_2.jpg&f=1&nofb=1&ipt=71de64dbc86eb5958afada9850432eded6d20d6b42cc45d003cc5a621fe7c369&ipo=images',category: "Paint", price: 30, stock: 5}    
];

/**
 * GET /api/health
 * sets a status to make sure the website is running
 */
app.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
});

/** 
 * GET /api/products
 *  sends products to the browser as a json
 */
app.get('/api/products', (req, res) => {
    res.json(products);
});

const path = require('path'); // gets the path of the url

app.get('/', (req, res) => { // asks the server to run this function
    res.send('Hello from my shop'); // sends this message to the server
});