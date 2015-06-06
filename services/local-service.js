var connection = require('../config').mssqllocal;
	var mssql = require('mssql');

function query(sql, callback){

	mssql.connect(connection, function(err){
		if(err) {
			console.log('Loi ket noi: \n' + err);
		}
		var request = new mssql.Request();
		// request.pipe(true);
		request.query(sql, function(err, data){
			callback(err, data);
		});
	})
}

exports.getContacts = function (next){
	var cmd = 'SELECT cu.CityID CityID, \
					cu.CustomerID CustomerID, \
	        cu.ci_Name CustomerName,\
	        cu.ci_Address CustomerAddress, \
	        co.ContactID ContactID, \
	        co.ct_Name ContactName,\
	        co.ct_Gender ContactGender, \
	        co.ct_Phone ContactPhone,\
	        co.ct_Job ContactJob\
			FROM  dbo.Contact co \
			INNER JOIN dbo.Customer cu WITH (NOLOCK) ON cu.CustomerID = co.CustomerID \
			ORDER BY co.CustomerID';

		query(cmd, function(err, contacts){
			if(err){
				console.log(err);
				return next(err);
			}
			next(null, contacts);
		});
}

exports.createContact = function(contact, next){
	var cmd = "INSERT INTO dbo.Contact ( \
		CustomerID, \
		ct_Name, \
		ct_Gender, \
		ct_Phone, \
		ct_Job \
		) VALUES (N'" 
		+ contact.CustomerID + "', N'"
		+ contact.Name + "', N'"
		+ contact.Gender + "', N'"
		+ contact.Phone + "', N'" 
		+ contact.Job + "')";

	console.log(cmd);
	query(cmd, function(err, data){
		if(err){
			console.log(err);
			return next(err);
		}
		next(null, data);
	});
}

exports.getContactDetails = function(contactid, next){
	var cmd = "SELECT cu.CityID CityID, \
					cu.CustomerID CustomerID, \
	        cu.ci_Name CustomerName,\
	        cu.ci_Address CustomerAddress, \
	        co.ContactID ContactID, \
	        co.ct_Name ContactName,\
	        co.ct_Gender ContactGender,\
	        co.ct_Phone ContactPhone,\
	        co.ct_Job ContactJob\
			FROM    dbo.Contact co \
			        INNER JOIN dbo.Customer cu WITH (NOLOCK) ON cu.CustomerID = co.CustomerID \
			WHERE co.ContactID = '" + contactid + "'"; 
			console.log(cmd);
			query(cmd, function(err, data){
				if(err){
					console.log(err);
					return next(err);
				}
				next(null, data);
			});
}

exports.updateContact = function(contact, next){
	var cmd = "UPDATE dbo.Contact \
				SET ct_Name = N'" + contact.Name 
				    + "', ct_Gender = '" + contact.Gender
				    + "', ct_Phone = '" + contact.Phone
				    + "', ct_Job = N'" + contact.Job
				+ "' WHERE   ContactID = '" + contact.Id + "'";

	console.log(cmd);
	query(cmd, function(err, data){
		if(err){
			console.log(err);
			return next(err);
		}
		next(null, data);
	});
}
exports.deteleContact = function(contact, next){
	var cmd = "DELETE FROM dbo.Contact WHERE ContactID = '" + contact.Id + "'";
	console.log(cmd);
	query(cmd, function(err, data){
		if(err){
			console.log(err);
			return next(err);
		}
		next(null, null);
	});
}