const mongoose = require('mongoose');

const { Schema } = mongoose;
// ProductSchema
const ProductSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model('products', ProductSchema);

module.exports = Product;
