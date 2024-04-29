const mongoose = require('mongoose');

const cancellationPolicySchema = new mongoose.Schema({
    title: String,
    rules: [
      {
        duration: Number,
        unit: String,
        condition: String,
        deadline: String,
        percentage: Number,
      },
    ],
    type: String,
    additionalId: String,
  });

const CancellationPolicy = mongoose.model('CancellationPolicy', cancellationPolicySchema);

module.exports = CancellationPolicy;



