const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String, 
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;