const mongoose = require('mongoose');

const whatToBringSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please enter an thing to bring title'],
    },
    type: String,
    additionalId: String
 
  },
  {
    timestamps: true,
  }
);

const WhatToBring = mongoose.model('WhatToBring', whatToBringSchema);

module.exports = WhatToBring;
