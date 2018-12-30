const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// register a new User
router.post('/register', (req, res) => {
  
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        const validating = userValidating(req.body);
        if (validating.error) {
          res.status(400).send(validating.error);
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: 0,  
          });
          user.save()
            .then(result => {
  
              var token = jwt.sign({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
              }, 'key', {
                exp:  Date.now() + 1000 * 60 
              });
              res.status(200).send(token);
  
            })
            .catch(err => {
              res.send(err);
            });
        }
      });
  
    }); 
  
  });
  
  //  To validate the POST PUT requestes
  function userValidating(user) {
    const userSchema = {
      'name': Joi.string().min(3).required(),
      'email': Joi.string().min(5).required(),
      'password': Joi.string().min(4).required(),
    }
    return Joi.validate(user, userSchema);
  }
  
//this router for login
router.post('/login', function (req, res) {
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) {
        return res.status(500).send('Error on the server.');
      }
  
      if (!user) {
        return res.status(404).send('User not found.');
      } else {
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      }
  
      if (!passwordIsValid) {
        return res.send({
          auth: false,
          token: null
        });
      } else {
  
      }
      const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }, 'key', {
        exp:  Date.now() + 1000 * 60
      });
  
      res.setHeader('authorization', token);
      res.status(200).send(token);
    });
  
  
  });
  
  module.exports = router;
