const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const codekunstSchema = new mongoose.Schema({
  projectcode: { type: String, unique: true },
  thumbnail: {
    type: String,
    default: 'http://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg'
  },
  userarts: [{ type: Schema.Types.ObjectId, ref: "Userart" }],
  code: { type: String }
});

const Codekunst = mongoose.model('Codekunst', codekunstSchema);

module.exports = Codekunst;