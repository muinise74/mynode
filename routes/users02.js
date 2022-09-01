var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({'message':'Node Get Success'});
});

module.exports = router;
