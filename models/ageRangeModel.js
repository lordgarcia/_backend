const mongoose = require('mongoose');

const ageRangeSchema = mongoose.Schema(
  {
    id: { type: String },
    title: { type: String },
    startAge : { type : Number },
    endAge : { type : Number },
    type: { type : String },
    additionalId: { type : String },
 
  },
  {
    timestamps: true,
  }
);

const AgeRange = mongoose.model('AgeRange', ageRangeSchema);

module.exports = AgeRange;
