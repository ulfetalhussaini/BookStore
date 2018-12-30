const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

  _id: mongoose.Schema.Types.ObjectId,
  name: {
        type: String,
        required: [true, 'Name Is Required'],
      },

  password: String,
  role: Number,
  email: {
    type: String,
    required: [true, 'Email Is Required'],
    unique: true
  }
 
});

module.exports = mongoose.model('User', userSchema);