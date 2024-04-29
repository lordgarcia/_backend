const mongoose = require('mongoose');

const languageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter an inclusion title'],
    },
  },
  {
    timestamps: true,
  }
);

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
