const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the product schema and model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

// Route to retrieve products with prices exceeding minPrice, sorted by price in descending order
router.get('/above/:minPrice', async (req, res) => {
    const minPrice = parseFloat(req.params.minPrice);
    if (isNaN(minPrice)) {
        return res.status(400).json({ error: 'Invalid price value' });
    }

    try {
        const products = await Product.find({ price: { $gt: minPrice } }).sort({ price: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
