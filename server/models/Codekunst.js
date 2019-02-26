const mongoose = require('mongoose');

const codekunstSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The codekunst name is required'],
    minlength: 1
  },
  capitals: {
    type: [String],
    default: []
  },
  area: {
    type: Number,
  },
  description: {
    type: String,
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Codekunst = mongoose.model('Codekunst', codekunstSchema);

module.exports = Codekunst;