const express = require('express');
const router = express.Router();
const DiscountRule = require('../Model/DiscountRules');

// Create a discount rule
router.post('/discount-rules', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the request body
    const discountRule = new DiscountRule(req.body);
    await discountRule.save();
    res.status(201).send(discountRule);
  } catch (error) {
    console.error('Error saving discount rule:', error); // Log the error
    res.status(400).send(error);
  }
});


// Get all discount rules
router.get('/discount-rules', async (req, res) => {
  try {
    const discountRules = await DiscountRule.find();
    res.send(discountRules);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Update a discount rule by ID
router.put('/discount-rules/:id', async (req, res) => {
  const updates = Object.keys(req.body.formValues);
  console.log(req.body,updates)
  const allowedUpdates = ['type', 'value', 'applicableTo', 'productId', 'categoryId', 'minOrderQuantity'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const discountRule = await DiscountRule.findByIdAndUpdate(req.params.id, req.body.formValues, { new: true, runValidators: true });

    if (!discountRule) {
      return res.status(404).send(); 
    }

    res.send(discountRule);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

// Delete a discount rule by ID
router.delete('/discount-rules/:id', async (req, res) => {
  try {
    const discountRule = await DiscountRule.findByIdAndDelete(req.params.id);

    if (!discountRule) {
      return res.status(404).send();
    }

    res.send(discountRule);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
