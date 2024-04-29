const mongoose = require('mongoose');

const inclusionSchema = mongoose.Schema(
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

const Inclusion = mongoose.model('Inclusion', inclusionSchema);

module.exports = Inclusion;
