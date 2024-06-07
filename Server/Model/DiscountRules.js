const mongoose = require('mongoose');

const discountRuleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['flat', 'percentage']
  },
  value: {
    type: Number,
    required: true
  },
  applicableTo: {
    type: String,
    required: true,
    enum: ['product', 'category', 'orderQuantity']
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    set: v => v === '' ? undefined : v
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    set: v => v === '' ? undefined : v
  },
  minOrderQuantity: {
    type: Number,
    required: function() {
      return this.applicableTo === 'orderQuantity';
    }
  }
});

const DiscountRule = mongoose.model('DiscountRule', discountRuleSchema);

module.exports = DiscountRule;
