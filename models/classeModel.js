const mongoose = require('mongoose');

const classeSchema = mongoose.Schema(
  {
    title: String,
    options: [String]
  },
  {
    timestamps: true,
  }
);

const Classe = mongoose.model('Classe', classeSchema);

module.exports = Classe;
