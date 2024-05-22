const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  products: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },  
});

module.exports = mongoose.model('Feedback', feedbackSchema);