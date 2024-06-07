const express = require('express');
const router = express.Router();
const Product = require('../Model/Product');
const upload = require('../multerConfig');

// Create a product
router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { name, description, basePrice } = req.body;
    if (!name || !description || !basePrice || !req.file) {
      return res.status(400).send({ error: 'All fields are required including the image' });
    }

    const image = req.file.path.replace(/\\/g, '/'); // Normalize the path to use forward slashes

    const product = new Product({ name, description, basePrice, image });
    await product.save();

    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a product by ID
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a product by ID
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
