const mongoose = require('mongoose');

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

const addressSchema = new mongoose.Schema({
  country: String,
  country_code: String,
  city_district: String,
  state_district: String,
  suburb: String,
  city: String,
  county: String,
  hamlet: String,
  municipality: String,
  postcode: String,
  region: String,
  road: String,
  state: String,
  village: String,

});

const coordinatesSchema = new mongoose.Schema({
  lat: String,
  lng: String,
});

const locationSchema = mongoose.Schema(
  {
    name: String,
    title: String,
    address: addressSchema,
    coordinates: coordinatesSchema,
    type: String,
    additionalId: String
  },
  {
    timestamps: true,
  }
);

const dayTourActivitySchema = new mongoose.Schema({
  code: String,
  name: String,
  ex: Number,
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
  themes: [String],
  shortDescription: String,
  description: String,
  images: [String],
  image: String,
  videos: [String],
  inclusions: [String],
  exclusions: [String],
  whatToBring: [String],
  languagesPresent: [String],
  languagesAvailable: [String],
  languages:[languageSchema],
  humanResources:[resourceSchema],
  materialResources:[resourceSchema],
  tasks:[taskSchema],
  rates: [
    {
      idRate: String,
      title: String,
      sel: Number,
      minIntegrantes: Number,
      maxIntegrantes: Number,
      languages: [String],
      startTimes: [startTimeSchema],
      camposGerados: Object,
      constraints: [constraintSchema],
      cancellationPolicys: [String],
      pickupLocation: locationSchema,
      dropoffLocation: locationSchema,
      itinerary: [locationSchema],
      price: [
        {
          title: String,
          startAge: Number,
          endAge: Number,
          fields: [
            {
              from: Number,
              to: Number,
              price: Number,
              descount: Number
            },
          ],
        },
      ],
    },
  ],
});

const DayTourActivity = mongoose.model('DayTourActivity', dayTourActivitySchema);

module.exports = DayTourActivity;