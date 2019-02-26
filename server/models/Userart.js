const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userartSchema = new mongoose.Schema({
  pictureUrl: {
    type: String,
    default: 'http://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg'
  },
  // thumbnail: {
  //   type: [String],
  //   default: ['http://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg']
  // },
  _codekunst: {
    type: Schema.Types.ObjectId,
    ref: 'Codekunst'
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Userart = mongoose.model('Userart', userartSchema);

module.exports = Userart;