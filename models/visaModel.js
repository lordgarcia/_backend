const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  longDescription: String,
  language: String,
});

const visaSchema = new mongoose.Schema({
  code: String,
  name: String,
  ex: Number,
  emo: String,
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
  languagesAvailable: [String],
  languages:[languageSchema],
  rates: [
    {
      id: Number,
      title: String,
      sel: Number,
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
            },
          ],
        },
      ],
    },
  ],
});

const Visa = mongoose.model('Visa', visaSchema);

module.exports = Visa;