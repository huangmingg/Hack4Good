var express = require('express');
var router = express.Router();
var cors = require('cors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// simple get method to check connection is established
router.get('/connection',  cors(), function(req, res, next) {
  res.send({'success' : true, 'msg': 'Successful HTTP GET'});
})

module.exports = router;
