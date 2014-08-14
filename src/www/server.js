var restify = require('restify');
var md5 = require('MD5');

var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

var API = {
	Error: {"error": "call failed"},
	NotAuthorized: {"error": "unauthorized"}
};


function createServer (db) {

	var server = restify.createServer({
	  name: 'RobotCloud',
	  version: '1.0.0'
	});

	server.use(restify.acceptParser(server.acceptable));
	server.use(restify.queryParser());
	server.use(restify.bodyParser());

	server.use(restify.CORS());
	server.use(restify.fullResponse());

	server.get('/echo/:name', function (req, res, next) {
	  res.send(req.params);
	  return next();
	});
	
	function validateToken (token, callback) {
		db.find({"user.token": token}, function (err, doc) {
			// console.log("Validate Token", arguments);
			if (err || doc.length == 0) {
				return callback(false);
			}
			else {
				return callback(true);
			}
		})
	}
	
	function generateGuid() {
	  var result, i, j;
	  result = '';
	  for(j=0; j<32; j++) {
	    if( j == 8 || j == 12|| j == 16|| j == 20) 
	      result = result + '-';
	    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
	    result = result + i;
	  }
	  return result;
	}
	
	
	server.post('/robots/list', function (req, res, next) {
		//
		// 	    res.setHeader('Access-Control-Allow-Origin','*');
		// 	    res.send(201, "");
		//
		// return next();
		
		db.find({"user.username": req.params.username}, function (err, doc) {

			if (doc.length > 0) {
			    res.setHeader('Access-Control-Allow-Origin','*');
			    res.send(201, doc[0].robots);

			}
			
			return next();
		})
		
	});
	
	server.post('/robot/id', function (req, res, next) {
		//
		// 	    res.setHeader('Access-Control-Allow-Origin','*');
		// 	    res.send(201, "");
		//
		// return next();
		console.log(req.params);
		db.find({"robots.id": req.params.id}, function (err, doc) {
			console.log(arguments)
			if (doc.length > 0) {
			    res.setHeader('Access-Control-Allow-Origin','*');
				for (var i =0, len = doc[0].robots.length; i < len; i += 1) {
					if (doc[0].robots[i].id == req.params.id) {
						res.send(200, doc[0].robots[i]);						
					}

				}
				return next();
			}
			

		})
		
	});
	
	
	server.post('/robot/delete', function (req, res, next) {
		

		validateToken(req.params.token, function (valid) {

			if (valid) {
				
				var robot = req.params.robot;
				// robot.id = guid();
				// console.log(robot);
				db.update({"user.token": req.params.token}, { $pull: { robots: robot } }, {}, function (err, numberUpdated) {
					
					if (!err && numberUpdated > 0) {
		  			    res.setHeader('Access-Control-Allow-Origin','*');
		  			    res.send(201, req.params);
		  				next();						
					}
					
					else {
		  			    res.setHeader('Access-Control-Allow-Origin','*');
		  			    res.send(500, req.params);
		  				next();
					}

				});
				
				
			}
			else {
			    res.setHeader('Access-Control-Allow-Origin','*');
			    res.send(400, API.NotAuthorized);
				next();
			}
		});
		
		
		
		//
		// 	    res.setHeader('Access-Control-Allow-Origin','*');
		// 	    res.send(201, "");
		//
		// return next();
		// console.log(req.params);
		db.find({"robots.id": req.params.id}, function (err, doc) {
			// console.log(arguments)
			if (doc.length > 0) {
			    res.setHeader('Access-Control-Allow-Origin','*');
				for (var i =0, len = doc[0].robots.length; i < len; i += 1) {
					if (doc[0].robots[i].id == req.params.id) {
						res.send(200, doc[0].robots[i]);						
					}

				}
				return next();
			}

		})
		
	});
	//
	// server.get('/user/:username/robots', function (req, res, next) {
	//
	//     res.setHeader('Access-Control-Allow-Origin','*');
	//     // res.send(200, {});
	//
	// 	db.find({"user.username": req.params.username}, function (err, doc) {
	//
	//
	// 		if (doc.length > 0) {
	//
	// 		    res.setHeader('Access-Control-Allow-Origin','*');
	// 		    res.send(200, doc[0].robots);
	// 			next();
	//
	// 		}
	// 		else {
	//
	// 		    res.setHeader('Access-Control-Allow-Origin','*');
	// 		    res.send(403, {error: "Invalid Account."});
	// 			next();
	//
	// 		}
	//
	//
	// 	});
	//
	// });
	
	server.post('/user/login', function (req, res, next) {
	
	  
		db.find({"user.username": req.params.username, "user.password": req.params.password}, function (err, doc) {

			if (err || doc.length == 0) {
			    res.setHeader('Access-Control-Allow-Origin','*');
			    res.send(403, {error: "Invalid Account."});
				return next();
			}
			else {

				var token = generateGuid();

				db.update({"user.username": req.params.username, "user.password": req.params.password}, {$set: {"user.token": token}}, {}, function (err, numReplaced) {
					if (numReplaced == 1) {
					    res.setHeader('Access-Control-Allow-Origin','*');
					    res.send(200, token);
						return next();											
					}
					else {
					    res.setHeader('Access-Control-Allow-Origin','*');
					    res.send(401, API.NotAuthorized);
						return next();
					}
				});



				
			}
		

	  

		  });
	  
 	 
	 
	});
	
	server.get('/user/:username', function (req, res, next) {
		
		db.find({"user.username": req.params.username}, function (err, doc) {

		    res.setHeader('Access-Control-Allow-Origin','*');
		    res.send(201, doc);
			
			return next();
		})
		
	});
	
	server.post('/user', function (req, res, next) {
		
		db.find({"user.username": req.params.username}, function (err, doc) {

		    res.setHeader('Access-Control-Allow-Origin','*');
		    res.send(201, doc[0]);
			
			return next();
		})
		
	});
	
	server.post('/user/logout', function (req, res, next) {
		
		db.find({"user.username": req.params.username}, function (err, doc) {
			
		    res.setHeader('Access-Control-Allow-Origin','*');
		    res.send(201, doc[0]);
			
			return next();
			
		});
		
	});
	
	server.post('/user/create', function (req, res, next) {
				console.log(md5(req.params.email));
		console.log(req.params);
		
	  if (req.params.name === undefined) {
	    return next(new restify.InvalidArgumentError('Name must be supplied'))
	  }
	  
	  var username = req.params.username;
  	  var password = req.params.password;
  	  var email = req.params.email;
  	  var name = req.params.name;
	  
	db.find({"user.username": req.params.username}, function (err, doc) {

		if (err || doc.length == 0) {
	  	  db.insert({
	  		  user: {
	  		  username: username,
	  		  password: password,
	  		  email: email,
	  		  name: name,
			  avatar: md5(email),
			  robots: []
	  	  }
	  	  }, function (err, newDoc) {   // Callback is optional
	  		  // newDoc is the newly inserted document, including its _id
	  		  // newDoc has no key called notToBeSaved since its value was undefined
		  
	    	    res.setHeader('Access-Control-Allow-Origin','*');
	    	    res.send(201, newDoc)
		
		
	  		return next();
		})
	
		}
		else {

		    res.setHeader('Access-Control-Allow-Origin','*');
		    res.send(403, {error: "User already exists."});
			return next();
		}
		

	  

	  });
	  
 	 
	  // console.log()
	  //
	  // userSave.create({ name: req.params.name }, function (error, user) {
	  //   if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

	  // })
	});
	
	
	server.post('/robot/update', function (req, res, next) {

		validateToken(req.params.token, function (valid) {
			if (valid) {
				
				var robot = req.params.robot;
				// robot.id = guid();
				console.log("Robot", robot);
				
				
				db.find({"robots.id": robot.id}, function (err, doc) {
					console.log(arguments)
					if (doc.length > 0) {
					    res.setHeader('Access-Control-Allow-Origin','*');
						for (var i =0, len = doc[0].robots.length; i < len; i += 1) {
							if (doc[0].robots[i].id == robot.id) {
								doc[0].robots[i] = robot;

								db.update({"robots.id": robot.id}, doc, {}, function (err, numberUpdated) {
								
									if (!err && numberUpdated > 0) {
						  			    res.setHeader('Access-Control-Allow-Origin','*');
						  			    res.send(201, req.params);
						  				next();						
									}
					
									else {
						  			    res.setHeader('Access-Control-Allow-Origin','*');
						  			    res.send(500, req.params);
						  				next();
									}
									
								})


							}

						}
						// return next();
					}
					else {
					    res.setHeader('Access-Control-Allow-Origin','*');
					    res.send(500, API.NotAuthorized);
						next();
					}
			

				})
				
				
				
				
			}
			else {
			    res.setHeader('Access-Control-Allow-Origin','*');
			    res.send(400, API.NotAuthorized);
				next();
			}
		});
		
	})
	
	server.post('/robot/property/create', function (req, res, next) {
		// http://sohowww.nascom.nasa.gov/data/realtime/eit_171/512/latest.jpg

		validateToken(req.params.token, function (valid) {
			if (valid) {
				
				var property = req.params.property;
				// robot.id = guid();
				console.log("Property", property);
				
				
				db.find({"robots.id": req.params.robot.id}, function (err, doc) {
					console.log(arguments)
					if (doc.length > 0) {
					    res.setHeader('Access-Control-Allow-Origin','*');
						for (var i =0, len = doc[0].robots.length; i < len; i += 1) {
							if (doc[0].robots[i].id == req.params.robot.id) {
								doc[0].robots[i].properties = doc[0].robots[i].properties || [];
								property.id = guid();
								doc[0].robots[i].properties.push(property);

								db.update({"robots.id": req.params.robot.id}, doc, {}, function (err, numberUpdated) {
								
									if (!err && numberUpdated > 0) {
						  			    res.setHeader('Access-Control-Allow-Origin','*');
						  			    res.send(201, req.params);
						  				next();						
									}
					
									else {
						  			    res.setHeader('Access-Control-Allow-Origin','*');
						  			    res.send(500, req.params);
						  				next();
									}
									
								})


							}

						}
						// return next();
					}
					else {
					    res.setHeader('Access-Control-Allow-Origin','*');
					    res.send(500, API.NotAuthorized);
						next();
					}
			

				})
				
				
				
				
			}
			else {
			    res.setHeader('Access-Control-Allow-Origin','*');
			    res.send(400, API.NotAuthorized);
				next();
			}
		});
		
	});
	
	
	
	
	server.post('/robot/properties/update', function (req, res, next) {

		validateToken(req.params.token, function (valid) {
			console.log(valid);
			if (valid) {
				
				var robot = req.params.robot;
				// robot.id = guid();
				console.log("Robot", robot);
				
				
				db.find({"robots.id": robot.id}, function (err, doc) {
					console.log("Document",arguments)
					if (doc.length > 0) {
					    res.setHeader('Access-Control-Allow-Origin','*');
						for (var i =0, len = doc[0].robots.length; i < len; i += 1) {
							if (doc[0].robots[i].id == robot.id) {
								doc[0].robots[i] = robot;

								db.update({"robots.id": robot.id}, doc, {}, function (err, numberUpdated) {
									console.log("update", arguments);
									if (!err && numberUpdated > 0) {
						  			    res.setHeader('Access-Control-Allow-Origin','*');
						  			    res.send(201, req.params);
						  				next();						
									}
					
									else {
						  			    res.setHeader('Access-Control-Allow-Origin','*');
						  			    res.send(500, req.params);
						  				next();
									}
									
								})


							}

						}
						// return next();
					}
					else {
					    res.setHeader('Access-Control-Allow-Origin','*');
					    res.send(500, API.NotAuthorized);
						next();
					}
			

				})
				
				
				
				
			}
			else {
			    res.setHeader('Access-Control-Allow-Origin','*');
			    res.send(400, API.NotAuthorized);
				next();
			}
		});
		
	});
	
	server.post('/robot/property/collection/update', function (req, res, next) {

		// {
		//     "msgID": 1407957959032,
		//     "timeStamp": 1407957959032,
		//     "name": "webgui",
		//     "sender": "arduino",
		//     "sendingMethod": "publishPin",
		//     "historyList": ["webgui"],
		//     "method": "publishPin",
		//     "data": [{
		//         "pin": 3,
		//         "type": 2,
		//         "value": 0,
		//         "source": "arduino"
		//     }]
		// }
		console.log("Robot Property Collection", req.params);
		res.send(200, req.params);
		next();
	});

	server.post('/robot/property', function (req, res, next) {
		// http://sohowww.nascom.nasa.gov/data/realtime/eit_171/512/latest.jpg
	});
	
	server.post('/robot/create', function (req, res, next) {

		validateToken(req.params.token, function (valid) {
			if (valid) {
				
				var robot = req.params.robot;
				robot.id = guid();
				db.update({"user.token": req.params.token}, { $push: { robots: robot } }, {}, function (err, numberUpdated) {
					
					if (!err && numberUpdated > 0) {
		  			    res.setHeader('Access-Control-Allow-Origin','*');
		  			    res.send(201, req.params);
		  				next();						
					}
					
					else {
		  			    res.setHeader('Access-Control-Allow-Origin','*');
		  			    res.send(500, req.params);
		  				next();
					}

				});
				
				
			}
			else {
			    res.setHeader('Access-Control-Allow-Origin','*');
			    res.send(400, API.NotAuthorized);
				next();
			}
		});
		
		// console.log(req.params);
		//
		// 	  if (req.params.name === undefined) {
		// 	    return next(new restify.InvalidArgumentError('Name must be supplied'))
		// 	  }
		//
	  
 	 
	  // console.log()
	  //
	  // userSave.create({ name: req.params.name }, function (error, user) {
	  //   if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

	    // res.setHeader('Access-Control-Allow-Origin','*');
	    // res.send(201, true)
	  // })
	})
      //
    //
    // db.insert(doc, function (err, newDoc) {   // Callback is optional
    //   // newDoc is the newly inserted document, including its _id
    //   // newDoc has no key called notToBeSaved since its value was undefined
    // });
  

	server.listen(9392, function () {
	  console.log('%s listening at %s', server.name, server.url);
	});


	
}

// Type 2: Persistent datastore with manual loading
var Datastore = require('nedb')
  , db = new Datastore({ filename: 'robots.db' });
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
  if (!err) {
	  createServer(db);
  }
  
  
  
});



