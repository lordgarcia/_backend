const mongoose = require('mongoose');

const themeSchema = mongoose.Schema(
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

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;
