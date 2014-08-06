var restify = require('restify');


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



function createServer (db) {

	var server = restify.createServer({
	  name: 'RobotCloud',
	  version: '1.0.0'
	});

	server.use(restify.acceptParser(server.acceptable));
	server.use(restify.queryParser());
	server.use(restify.bodyParser());

	server.get('/echo/:name', function (req, res, next) {
	  res.send(req.params);
	  return next();
	});
	//
	// server.get('/user/:username', function (req, res, next) {
	//
	// 	return next();
	// });

	server.get('/user/:username/robots', function (req, res, next) {
	  res.send(req.params);
	  return next();
	});
	
	server.post('/user/login', function (req, res, next) {
	
	  
		db.find({"user.username": req.params.username, "user.password": req.params.password}, function (err, doc) {

			if (err || doc.length == 0) {
			    res.setHeader('Access-Control-Allow-Origin','*');
			    res.send(403, {error: "Invalid Account."});
				return next();
			}
			else {

			    res.setHeader('Access-Control-Allow-Origin','*');
			    res.send(200, doc);
				return next();
				
			}
		

	  

		  });
	  
 	 
	 
	});
	
	server.get('/user/:username', function (req, res, next) {
		
		db.find({"user.username": req.params.username}, function (err, doc) {

		    res.setHeader('Access-Control-Allow-Origin','*');
		    res.send(201, doc)
			
			return next();
		})
		
	});
	
	server.post('/user/create', function (req, res, next) {
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
	  		  name: name
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
	})
	
	server.post('/robot/create', function (req, res, next) {
		console.log(req.params);
		
	  if (req.params.name === undefined) {
	    return next(new restify.InvalidArgumentError('Name must be supplied'))
	  }
	  
	  
 	 
	  // console.log()
	  //
	  // userSave.create({ name: req.params.name }, function (error, user) {
	  //   if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))

	    res.setHeader('Access-Control-Allow-Origin','*');
	    res.send(201, true)
	  // })
	})
      //
    //
    // db.insert(doc, function (err, newDoc) {   // Callback is optional
    //   // newDoc is the newly inserted document, including its _id
    //   // newDoc has no key called notToBeSaved since its value was undefined
    // });
  

	server.listen(9393, function () {
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



