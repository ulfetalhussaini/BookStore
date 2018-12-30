const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({

  title: {
    type: String,
    required: [true, 'Title Is Required']
  },
  author: {
    type: String,
    required: [true, 'Author Name Is Required']
  },
  PublishedAt: String,
  file: {
    type: String,
    required: [true, 'Book File Is Required']
  },
  coverImg: {
    type: String,
    required: [true, 'Book Image Is Required']
  }
});

module.exports = mongoose.model('Book', bookSchema);