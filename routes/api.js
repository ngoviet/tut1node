var express = require('express');
var router 	= express.Router();
var jwt			= require('jsonwebtoken');
var bcrypt 	= require('bcrypt');
var http		= require('http');
var sms247 	= require('../config').sms247;
var User 		= require('../models/user').User;

var config = require('../config');

var app = express();

app.set('superSecret', config.secret);

router.get('/setup', function(req, res, next){

	// Tao user mau
	var admin = new User({
		fullname: 'Ngô Đức Việt',
		username: 'admin',
		email: 'ngoducvietds@gmail.com',
		password: '1111',
	});

	admin.save(function(err){
		if(err) { return(next(err)); }

		console.log('Admin da duoc luu');
		res.json({ success: true });
	});
});



router.get('/sendsms', function(req, res, next){
	// var options = {
	// 	hostname: 'http://7.59.6.251',
	// 	port: 8080,
	// 	path: '/http/' + sms247.sendSms,
	// 	method: 'GET'
	// };
	// console.log(options.path);
	// var request = http.request(options, function(res){
	// 	res.on('data', function(chunk){

	// 	});
	// });

	// request.on('error', function(e){
	// 	console.log(e.message);
	// });

	// request.end();
	var options = {
		hostname: 'http://7.59.6.251',
		port: 8080,
		// path: '/http/send-message?username=admin&password=3232&to=0919278012&message=HTTP',
		method: 'GET'
		
	};
	console.log('path: ' + options.path);
	http.request(options, function(res){
		res.setEncoding('utf8');
		res.on('data', function(chunk){
			console.log(chunk);
		});
	}).end();
});

// URL not need authenticate
router.post('/register', function(req, res, next){
	if(!(req.body.fullname && req.body.username && req.body.email && req.body.password)){
		return res.json({success: false, message: 'Vui lòng điền đầy đủ các trường: fullname, username, email, password'});
	}

	var user = new User();
	user.fullname 			= req.body.fullname;
	user.username 			= req.body.username;
	user.usernameLower	= req.body.username.toLowerCase();
	user.email 					= req.body.email.toLowerCase();
	
	User.findOne({$or:[{usernameLower: user.usernameLower}, {email: user.email}]}, function(err, value){
		if(err){
			return next(err);
		} else if(value) { 
			// console.log(value);
			if(value.usernameLower == user.usernameLower){
				return res.json({success: false, message: 'Tài khoản đã tồn tại'}); 
			} else if(value.email == user.email){
				return res.json({success: false, message: 'Email đã tồn tại'}); 
			}
		}

		bcrypt.hash(req.body.password, 10, function(err, hash){
		
			user.password = hash;
			user.save(function(err, user){

				if(err) { 
					console.log(err.message);
					return(next(err)); 
				}
				res.status(200);
				res.json({success: true, message: 'Tạo tài khoản thành công'});
			});
		});
	});

	
});

router.post('/login', function(req, res, next){
	User.findOne({
		usernameLower: req.body.username.toLowerCase()
	}, function(err, user){

		if(err) { return next(err); }

		if(!user){
			res.json({success: false, message: 'Đăng nhập lỗi. Tên đăng nhập không tồn tại'});
		} else if (user){

			// Kiem tra password
			bcrypt.compare(req.body.password, user.password, function(err, valid){
				if(err) { return next(err); }
				if(!valid){
					res.json({success: false, message: 'Đăng nhập lỗi. Sai mật khẩu'});	
				} else {
	
					// Tao token
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresInMinutes: 1440 // 24h
					});

					res.json({
						success: true,
						message: 'Token của bạn',
						token: token
					});					
				}
			});
		}
	});

});

// Authenticate all URL after this
router.use(function(req, res, next){

	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	if(token) {

		jwt.verify(token, app.get('superSecret'), function(err, decoded){
			if(err){
				return res.json({ success:false, message: 'Token error.' });
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;
				next();
			}
		});
	} else {
		// if there is no token, return an error
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});
	}
});

// URL Authenticated
router.get('/', function(req, res, next){
	User.find({}, function(err, users) {
		res.json(users);
	});
});


module.exports = router;