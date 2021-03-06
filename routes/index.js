var express = require('express');
var router = express.Router();
var User = require('../models/users');

// GET /register
router.get('/register', function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.email &&
    req.body.name &&
    req.body.personality &&
    req.body.password &&
    req.body.confirmPassword) {

      if (req.body.password !== req.body.confirmPassword) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }

      var userData = {
        email: req.body.email,
        name: req.body.name,
        personality: req.body.personality,
        password: req.body.password
      };

      User.create(userData, function (error, user) {
        if (error) {
          return next(error);
        } else {
          return res.redirect('/profile');
        }
      });
      
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
})

router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;