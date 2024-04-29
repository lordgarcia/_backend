const mongoose = require('mongoose');

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
    type: String
  },
  {
    timestamps: true,
  }
);

const PickupPlace = mongoose.model('PickupPlace', locationSchema);

module.exports = PickupPlace;
