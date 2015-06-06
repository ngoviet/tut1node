var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var userService = require('../services/user-service');

var userSchema = new Schema({
	fullname: {type: 'String', required: true},
	username: {type: 'String', required: true},
	usernameLower: {type: 'String', required: true}, 
	email: {type: 'String', required: true},
	password: {type: 'String', required: true},
	created: {type: Date, default: Date.now}
});

function toLower(str){
	return str.toLowerCase();
}
// userSchema.path('username').validate(function(value, next){
// 	userService.findUser(value, function(err, user){
// 		if(err) {
// 			console.log(err);
// 			return next(false);
// 		}
// 		console.log(value);
// 		next(!user);
// 	});
// }, 'Tài khoản này đã tồn tại');

// userSchema.path('email').validate(function(value, next){
// 	userService.findEmail(value, function(err, user){
// 		if(err) {
// 			console.log(err);
// 			return next(false);
// 		}
// 		next(!user);
// 	});
// }, 'Email này đã tồn tại');

var User = mongoose.model('User', userSchema);

module.exports = {
	User: User
};