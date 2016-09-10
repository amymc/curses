'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
mongoose.connect('mongodb://[username]:[password]@[host]:[port]/amymc_curses?authMechanism=SCRAM-SHA-1');

var Curse = require('./app/models/curse');
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/curses')
  .post(function(req, res) {
    var curse = new Curse();
    curse.name = req.body.name;

    curse.save(function(err) {
      res.json({ message: 'Curse created!' });
    });
  })

  .get(function(req, res) {
    Curse.find(function(err, curses) {
      if (err)
        res.send(err);

      res.json(curses);
    });
  });

router.route('/curses/:curse_id')
  .get(function(req, res) {
    Curse.findById(req.params.curse_id, function(err, curse) {
      if (err)
        res.send(err);

      res.json(curse);
    });
  })

  .put(function(req, res) {
    Curse.findById(req.params.curse_id, function(err, curse) {
      if (err)
        res.send(err);

      curse.name = req.body.name;
      curse.save(function(err) {
          if (err)
              res.send(err);

          res.json({ message: 'Curse updated!' });
      });
    });
  })

  .delete(function(req, res) {
    Curse.remove({
      _id: req.params.curse_id
    }, function(err, bear) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });

app.use('/api', router);

app.listen(port);
console.log('Running on port ' + port);