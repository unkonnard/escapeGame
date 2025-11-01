const mongoose = require('mongoose');

const TimerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startTime: { type: Date, default: null },
  accumulatedTime: { type: Number, default: 0 }, // en millisecondes
  isRunning: { type: Boolean, default: false },
  enigmaId: { type: Number, required: true }
});

module.exports = mongoose.model('Timer', TimerSchema);