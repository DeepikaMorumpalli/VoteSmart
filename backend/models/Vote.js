const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
    unique: true, // Ensures one vote per email
  },
  candidate: {
    type: String,
    required: true,
  },
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
