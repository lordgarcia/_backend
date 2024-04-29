const mongoose = require('mongoose');

const exclusionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter an exclusion title'],
    },
    type: String,
    additionalId: String
  },
  {
    timestamps: true,
  }
);

const Exclusion = mongoose.model('Exclusion', exclusionSchema);

module.exports = Exclusion;
