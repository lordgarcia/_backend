const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter an inclusion title'],
    },
    type: String,
    additionalId: String
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
