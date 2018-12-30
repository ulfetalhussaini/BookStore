const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const Book = require('../models/book.model');
const fileUpload = require('express-fileupload');
const uuidv1 = require('uuid/v1');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Admin = require('../middleware/Admin');
var bodyParser = require('body-parser');

// only admin can add books
router.post('/add', Admin, (req, res) => {
  const validating = bookValidating(req.body);
  if (validating.error) {
    res.status(400).send(validating.error);
  } else {
    var file = req.files.file,
      name = file.name,
      type = file.mimetype;
    var FileUud = uuidv1();
    var Filepath = './public/' + FileUud + name;
    var urlFile = FileUud + name;
    const URl = req.originalUrl;
    const backURL = req.header('Referer') || '/';

    file.mv(Filepath);

    var coverImg = req.files.BookCover,
      name = coverImg.name,
      type = coverImg.mimetype;
    var coverImgUud = uuidv1();
    var coverImgPath = './public/' + coverImgUud + name;
    var urlimg = coverImgUud + name;
    coverImg.mv(coverImgPath);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      file: urlFile,
      coverImg: urlimg,
      PublishedAt: req.body.PublishedAt,
    });
    book.save().then(result => {
      res.status(200).send(result);
    }).catch(err => {
      res.send(err);
    })
  }


});

//Validating function
function bookValidating(book) {
    const bookSchema = {
      'title': Joi.string().min(3).required(),
      'author': Joi.string().min(3).required(),
      'token': Joi.string().required(),
      'PublishedAt': Joi.string().min(3).required()
    }
    return Joi.validate(book, bookSchema);
  }

module.exports = router;