const mongoose = require('mongoose');
const { Schema } = mongoose;

const participantSchema = new Schema({
  name: String,
  age: Number,
  nationality: String,
});

const rateFieldSchema = new Schema({
  title: String,
  startAge: Number,
  endAge: Number,
  fields: [{
    from: Number,
    to: Number,
    price: Number,
  }],
});

const rateSchema = new Schema({
  id: Number,
  title: String,
  sel: Number,
  price: [rateFieldSchema],
});

const roomSchema = new Schema({
  id: String,
  code: String,
  title: String,
  description: String,
  image: String,
  typology: String,
  capacity: String,
  inclusions: [String],
});

const cardSchema = new Schema({
  id: String,
  code: String,
  name: String,
  rates: [rateSchema],
  ac: Number,
  emo: String,
  rooms: [roomSchema],
});

const dropZoneSchema = new Schema({
  id: Number,
  title: String,
  data: String,
  diaSeman: String,
  cards: [cardSchema],
  day: Number,
  hour: Number,
  minute: Number,
  localization: String,
  categories: [String],
  themes: [String],
  shortDescription: String,
  description: String,
  image: String,
  videos: [String],
  inclusions: [String],
  exclusions: [String],
  knowBeforeYouGo: [String],
  languages: [String],
  hasNotes: Boolean,  
  notas: [String],
  breakfast: Boolean,
  lunch: Boolean,
  dinner: Boolean,
});

const packageTourSchema = new Schema({
  startDate: Date,
  endDate: Date,
  selectedLanguage: {
    label: String,
  },
  duration: Number,
  titulo: String,
  status: String,
  participants: [participantSchema],
  destinations: [String],
  participantsAge: [Number],
  budget: String,
  sp: String,
  ep: String,
  leadTraveller: String,
  dropZones: [dropZoneSchema],
});

const PackageTour = mongoose.model('PackageTour', packageTourSchema);

module.exports = PackageTour;
