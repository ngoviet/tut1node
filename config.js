var config = {};

	config.mongoUri = 'mongodb://localhost/tut1node';
	config.cookieMaxAge = 30*24*3600*1000;
	config.secret = 'ilovescotchyscotch';

	config.mssqlvnpt = {
		user: 'sa',
		password: '1111',
		server: '10.0.2.2',
		database: 'VNPT-Tracking'
	} 


	config.mssqllocal = {
		user: 'sa',
		password: '1111',
		server: '10.0.2.2',
		database: 'VNPT-Tracking'
	}

	/**
	 * Normalize a port into a number, string, or false.
	 */
	config.port = normalizePort(process.env.PORT || '3333');

	function normalizePort(val) {
	  var port = parseInt(val, 10);

	  if (isNaN(port)) {
	    // named pipe
	    return val;
	  }

	  if (port >= 0) {
	    // port number
	    return port;
	  }

	  return false;
	}
// };
module.exports = config;