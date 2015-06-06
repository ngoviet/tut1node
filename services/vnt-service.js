// var sql = require('mssql');
var connection = require('../config').mssqlvnpt;

exports.query = function (sql, callback){

	var mssql = require('mssql');

	mssql.connect(connection, function(err){
		if(err){
			console.log('Loi ket noi: \n' + err);
		}
		var cmd = new mssql.Request();
		cmd.query(sql, function(err, data){
			callback(err, data);
		});
	})
}

// function query (sql, callback){

// 	var mssql = require('mssql');

// 	mssql.connect(connection, function(err){
// 		if(err){
// 			console.log('Loi ket noi: \n' + err);
// 		}
// 		var cmd = new mssql.Request();
// 		cmd.query(sql, function(err, data){
// 			callback(err, data);
// 		});
// 	})
// }

// Danh sach lien he
// exports.getContacts = function(sql, callback){
// 	var cmd = 'SELECT CityID , \
//         cu.ci_Name ,\
//         cu.ci_Address ,\
//         co.ct.ContactID, \
//         co.ct_Name ,\
//         co.ct_Phone ,\
//         co.ct_Job\
// 		FROM    dbo.Contact co\
// 		        INNER JOIN dbo.Customer cu WITH (NOLOCK) ON cu.CustomerID = co.CustomerID\
// 		ORDER BY co.CustomerID';

// 		trackingSvr.query(cmd, function(err, data){
// 			if(err){
// 				return res.status(500).json({error: "Lỗi lấy danh sách liên hệ"});
// 			}
// 			res.json(data);
// 		});
// }
