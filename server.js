/**
 * backend database for the website
 */
const express = require('express') //loads express library
const app = express() // creates server application (here we add routes)
const PORT = process.env.PORT || 3000 // tries to use a local PORT if one exisits otherwise is set to 3000
const path = require('path') // loads path library
app.use(express.static(path.join(__dirname, 'public'))) // sets the public folder as the static folder for the website

const products = require('./routes/products') // loads the products route
app.use('/api/products', products) // adds the products route to the server

/**
 * GET /api/health
 * sets a status to make sure the website is running
 */
app.get('/api/health', (req, res) => {
    res.json({status: 'ok'});
});

app.get('/', (req, res) => {}); // creates the backend for the website 

app.listen( PORT, () => {
    console.log(`Amahay backend is running at local http://localhost:${PORT}`) // logs url to terminal if the site is running
});

