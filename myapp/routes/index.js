var express = require('express');
var router = express.Router();

/*controller 이용*/
const mainController = require('../controller/main');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', mainController.mainscreen);

module.exports = router;
