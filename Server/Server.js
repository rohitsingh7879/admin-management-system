const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/ProductRoutes');
const discountRulesRouter = require('./Routes/DiscountRules')
const taxRulesRouter = require('./Routes/TaxRule')
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', productRoutes);
app.use('/api', discountRulesRouter);
app.use('/api', taxRulesRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/product_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
