const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  longDescription: String,
  language: String,
});

const SeasonSchema = new Schema({
  endDate: {
    type: String,
    required: true,
  },
  id: {
    type: String,
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
    type: String,
    required: true,
  },
  tiers: {
    type: Array,
    default: [],
  },
});



// Esquema para o preço de um campo específico
const PriceFieldSchema = new Schema({
  from: {
    type: Number,
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Esquema para a taxa (rate) incluindo os preços para adultos e crianças
const RateSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  sel: {
    type: Number,
    required: true,
  },
  price: [
    {
      title: String,
      startAge: Number,
      endAge: Number,
      fields: [PriceFieldSchema],
    },
  ],
});

// Esquema para os quartos
const RoomSchema = new Schema({
  id: String,
  code: String,
  title: String,
  description: String,
  image: String,
  typology: String,
  capacity: String,
  inclusions: [String],
  pricePerSeason: [SeasonSchema]
});



const startTimeSchema = new mongoose.Schema({
  id: String,
  value: String,
  duration: String
});

const taskSchema = new mongoose.Schema({
  
  title: String,
  description: String,
  subtasks: [String],
});

const camposGeradosSchema = new mongoose.Schema({
  id: String,
  from: Number,
  to: Number,
  price: String,
  descount: String
});


const resourceSchema = new mongoose.Schema({
  
  id: String,
  title: String,
  number: Number,
});

const constraintSchema = new mongoose.Schema({
  
  id: String,
  title: String,
  startAge: Number,
  endAge: Number,
});

const languageSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  longDescription: String,
  language: String,
  code: String
});

const accommodationSchema = new mongoose.Schema({
  code: String,
  name: String,
  ac: Number,
  tipe: String,
  type: String,
  rateType: String,
  emo: String,
  day: Number,
  hour: Number,
  minute: Number,
  localization: String,
  categories: [String],
  startTimes: [startTimeSchema],
  seasons:[SeasonSchema],
  themes: [String],
  shortDescription: String,
  description: String,
  images: [String],
  image: String,
  videos: [String],
  inclusions: [String],
  exclusions: [String],
  knowBeforeYouGo: [String],
  languagesPresent: [String],
  languagesAvailable: [String],
  languages:[languageSchema],
  humanResources:[resourceSchema],
  materialResources:[resourceSchema],
  tasks:[taskSchema],
  rooms: [RoomSchema],
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;