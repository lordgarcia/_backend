const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  longDescription: String,
  language: String,
});

const SeasonSchema = new mongoose.Schema({
  endDate: {
    type: Date,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  seasonTitle: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  tiers: {
    type: Array,
    default: [],
  },
});

const rentalSchema = new mongoose.Schema({
  code: String,
  name: String,
  ex: Number,
  emo: String,
  type: String,
  typeRental: String,
  brand: String,
  model: String,
  color: String,
  fuel: String,
  passengerNumber: Number,
  doorNumber: Number,
  bagNumber: Number,
  distanceNumber: Number,
  categories: [String],
  themes: [String],
  shortDescription: String,
  description: String,
  image: String,
  videos: [String],
  inclusions: [String],
  exclusions: [String],
  knowBeforeYouGo: [String],
  languagesAvailable: [String],
  pricePerSeason: [SeasonSchema]
});

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;