const mongoose = require('mongoose');

const clueSchema = new mongoose.Schema({
  clueKey: {
    type: String,
    required: true,
    unique: true
  },
  clueValue: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  autorization: {
    type: String,
    required: true
  },
  lastLog: {
    type: String,
    required: true
  },
  firstLog: {
    type: String,
    required: true
  },
  numPurchase: {
    type: String,
    required: true
  },
  shipAdress: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('DatabaseClue', clueSchema);
