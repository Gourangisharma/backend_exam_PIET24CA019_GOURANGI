const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title:       { type: String, required: [true, 'title is required'], trim: true },
    author:      { type: String, required: [true, 'author is required'], trim: true },
    price:       { type: Number, min: [1, 'price must be at least 1'] },
    category:    { type: String, trim: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
