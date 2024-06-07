const express = require('express');
const TaxRule = require('../Model/TaxRule');
const router = express.Router();



// Create a tax rule
router.post('/tax-rules', async (req, res) => {
  console.log(req.body)
  const { city, taxRate,description, state, country } = req.body;
  try {
    const newTaxRule = new TaxRule({city, taxRate,description, state, country });
    const savedTaxRule = await newTaxRule.save();
    res.status(201).json(savedTaxRule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tax rules
router.get('/tax-rules', async (req, res) => {
  try {
    const taxRules = await TaxRule.find();
    res.json(taxRules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a tax rule
router.put('/tax-rules/:id', async (req, res) => {
  const { id } = req.params;
  const { city, taxRate,description, state, country } = req.body;
  try {
    const updatedTaxRule = await TaxRule.findByIdAndUpdate(id, { city, taxRate,description, state, country  }, { new: true });
    res.status(201).json(updatedTaxRule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a tax rule
router.delete('/tax-rules/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await TaxRule.findByIdAndDelete(id);
    res.status(201).json({ message: 'Tax rule deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router