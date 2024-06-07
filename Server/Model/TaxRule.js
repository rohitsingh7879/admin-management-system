const mongoose = require('mongoose');

const taxRuleSchema = new mongoose.Schema({
  state: { type: String, required: true },
  city: { type: String, required: true },
  taxRate: { type: Number, required: true },
  description: { type: String, required: true },
  country: { type: String, required: true }
});

const TaxRule = mongoose.model('TaxRule', taxRuleSchema);

module.exports = TaxRule;
