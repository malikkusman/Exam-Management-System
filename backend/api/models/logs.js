const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: String,
    enum: ['info', 'warning', 'error'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  where: {
    type: String,
  },
  // You can add more fields as needed for your logging requirements
}, { timestamps: true });

const Log = mongoose.model('Logs', logSchema);

module.exports = Log;
