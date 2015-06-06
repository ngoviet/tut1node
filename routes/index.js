var express = require('express');
var router 	= express.Router();
var port 		= require('../config').port;

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(www);
	res.send('Hello! The API is at http://localhost:' + port + '/api');
});

module.exports = router;
