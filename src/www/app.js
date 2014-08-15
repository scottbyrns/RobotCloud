var Server = {
	path: "localhost",
	port: "9392"
};

// if (localStorage.getItem("authkey")) {
// 	alert("authenticated");
// }


var robotDashboard = angular.module('RobotDashboard', ['ngSanitize', 'LocalStorageModule', 'RobotCloudDataProvider']);


robotDashboard.directive('draggable', function() {
  return function(scope, element) {
    // this gives us the native JS object
    var el = element[0];
    
    el.draggable = true;
    
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );
    
    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        return false;
      },
      false
    );
  }
});

robotDashboard.directive('droppable', function() {
  return {
    scope: {
      drop: '&',
      bin: '='
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];
      
      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();
          
          this.classList.remove('over');
          
          var binId = this.id;
          var item = document.getElementById(e.dataTransfer.getData('Text'));
          this.appendChild(item);
          // call the passed drop function
          scope.$apply(function(scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {            
              fn(item.id, binId);
            }
          });
          
          return false;
        },
        false
      );
    }
  }
});





robotDashboard.controller('AppController', function ($scope, $http, localStorageService, robotCloudDataProvider) {
	
});

robotDashboard.controller('SuggestProperties', function ($scope, $http, localStorageService, robotCloudDataProvider) {
	
});

robotDashboard.controller('RobotProperties', function ($scope, $http, localStorageService, robotCloudDataProvider) {
	
});



robotDashboard.controller('AccountController', function ($scope, $http, localStorageService, robotCloudDataProvider) {
	
	// console.log("LocalStoreService", localStorageService);
	
	if (robotCloudDataProvider.userIsAuthenticated() && document.getElementById("login-form")) {
		window.location.href = "caretaker.html";
	}
	
	robotCloudDataProvider.getUserByToken(localStorageService.get("authkey"));
	
    // robotCloudDataProvider.validateToken(token, $http, success, error);
	
	$scope.username = "";
	$scope.password = "";
	
	$scope.isAuthenticated = true;
	
	$scope.login = function () {
		
		// $scope.isAuthenticated = false;
		// console.log($scope.username, $scope.password);
		
		
		
		$http({
			method: 'POST',
			url: "http://" + Server.path + ":" + Server.port + "/user/login",
			data: $.param({
				username:$scope.username,
				password:$scope.password
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function (data) {
				
				localStorageService.set("authkey", data.replace("\"", '').replace("\"", ''));
				localStorageService.set("username", $scope.username);
				window.location.href = "caretaker.html";
		  }).error(function () {
			  alert("Failure");
		  });
		
		
		//window.location.href = "caretaker.html";
		
	};
	
});

robotDashboard.controller('RobotMap', function ($scope, $http, localStorageService) {
	$scope.mapKey = "AIzaSyD7xE8sOjQDByoIgCcv-xxpYvpLxCrm4_4";
});

robotDashboard.controller('CareTakerController', function ($scope, $http, localStorageService) {
	
	$scope.subViews = {
		map: {
			template: '/views/RobotMap.html',
			active: false,
			initialized: false
		},
		list: {
			template: '/views/RobotList.html',
			active: true
		}
	};
	
	$scope.showView = function(name) {
		
		for (var view in $scope.subViews) {
			try {
				$scope.subViews[view].active = false;
			}
			catch (e){
				alert(e)
			}
		}

		$scope.subViews[name].active = true;
		if (name == "map") {
			if (!$scope.subViews[name].initialized) {
				$scope.subViews[name].initialized = !$scope.subViews[name].initialized;
				initialize()
			}

		}
	}
	
  $scope.caretaker = {
	  name: "",
	  credentials: {
		  avatar: ""
	  },
	  notifications: [
	  {},
	  {}
	  ]
  }
  
  $http({
	method: 'POST',
	url: "http://" + Server.path + ":" + Server.port + "/user",
	data: $.param({
		username:localStorageService.get("username"),
	}),
	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data) {
		
		$scope.caretaker.name = data.user.name;
		$scope.caretaker.credentials.avatar = "http://gravatar.com/avatar/" + data.user.avatar;
		console.log("post",data)
		
		
		
  }).error(function () {
	  alert("Failure");
  })
  

$scope.logout = function () {
	$http({
		method: 'POST',
		url: "http://" + Server.path + ":" + Server.port + "/user/logout",
		data: $.param({
			username:localStorageService.get("username"),
		}),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data) {
		
		localStorageService.clearAll();
		// localStorage.setItem("authkey", undefined);
		window.location.href = "index.html";
		
  }).error(function () {
	  alert("Failure");
  })
};

$scope.addRobot = function () {
	window.location.href="addRobot.html";
};
	
	$scope.settings = function () {
		window.location.href="settings.html";
	};
	
	$scope.dashboard = function () {
		window.location.href="caretaker.html";
	};
	
});

	


robotDashboard.controller('RobotOverviewController', function ($scope, $http, localStorageService, $sce) {
  $scope.robot = {
	  name: "Loading...",
	  description: "",
	  avatar: ""
  }
  	$http({
		method: 'POST',
		url: "http://" + Server.path + ":" + Server.port + "/robot/id",
	      data: $.param({id:location.hash.replace("#","").replace("/", "")}),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data) {
		console.log("Robots", data)
		$scope.robot = data;
	}).error(function (data) {
	  alert("Failure");
	});
	
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
	
	$scope.removeProperty = function (id) {
		

		for (var i = 0, len = $scope.robot.properties.length; i < len; i += 1) {
			
			if ($scope.robot.properties[i].id == id) {

				$scope.robot.properties.splice(i, 1);
				i-=1;
				len -=1;

			}
			
		}
		
		$scope.updateColumns(function () {
			// alert("Success");
		}, function () {
			alert("Failure");
		});
		
	};
	
	$scope.updateProperty = function (id) {
		$scope.updateColumns(function () {
			document.getElementById(id).classList.toggle('hover');
		}, function () {
			alert("error");
		});

	};
	
	$scope.click = function (id) {
		document.getElementById(id).classList.toggle('hover');
	}
	
	$scope.drop = function (property, column) {
		console.log(arguments);
		
		var properties = $scope.robot.properties;
		for (var i = 0, len = properties.length; i < len; i += 1) {
			
			if (properties[i].id == property) {
				properties[i].column = column * 1;

			}
			
		}
		
		$scope.updateColumns(function () {

		}, function () {
			alert("error");
		});
		
		// console.log($scope.robot);
	}
	
	$scope.updateColumns = function (success, failure) {
		
		var bot = $scope.robot;
		// delete bot.$$hasKey;

		for (var i = 0, len = bot.properties.length; i < len; i += 1) {

			delete bot.properties[i]['$$hashKey'];

		}
		
	  	$http({
			method: 'POST',
			url: "http://" + Server.path + ":" + Server.port + "/robot/properties/update",
		      data: $.param({robot:bot, token:localStorageService.get("authkey")}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function (data) {
			if (typeof success === 'function') {
				success();
			}
			console.log("Robots", data)
			// $scope.robot = data;
		}).error(function (data) {
			if (typeof failure === 'function') {
					failure();
			}
		});
	};
  
});


robotDashboard.controller('RobotsList', function ($scope, $http, localStorageService) {
	
	
  $scope.robots = [
  ];
  
  $scope.showRobot = function (index) {
	  console.log($scope.robots[index]);
	  window.location.href = "robot.html#"+$scope.robots[index].id;
  }
	$http({
		method: 'POST',
		url: "http://" + Server.path + ":" + Server.port + "/robots/list",
	      data: $.param({username:localStorageService.get("username")}),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data) {
		console.log("Robots", data);
		$scope.robots = data;
	}).error(function (data) {
	  alert("Failure");
	})
  
});



robotDashboard.controller('RegisterController', function ($scope, $http, localStorageService) {

	$scope.user = {
	  username: "",
	  password: "",
	  email: "",
	  name: ""
	};
	
	$scope.register = function () {
		$http({
			
			method: 'POST',
			url: "http://" + Server.path + ":" + Server.port + "/user/create",
			data: $.param($scope.user),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			
		}).success(function () {
			
			$http({
				method: 'POST',
				url: "http://" + Server.path + ":" + Server.port + "/user/login",
				data: $.param($scope.user),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				
			}).success(function (data) {
				
				localStorageService.set("authkey", data.replace("\"", '').replace("\"", ''));
				localStorageService.set("username", $scope.user.username);
				window.location.href = "caretaker.html";
				
		  }).error(function () {
			  alert("Failure to login");
		  })
		  
	  }).error(function () {
		  alert("Failure");
	  })
	};
	
	console.log($scope);
});



robotDashboard.controller('RobotCreator', function ($scope, $http, localStorageService) {
  $scope.robot = {
	  name: "",
	  description: "",
	  avatar: "/images/robot.jpg"
  };
  
  $scope.addRobot = function () {
	  console.log($scope.robot);
	  $http({
		  
	      method: 'POST',
	      url: "http://" + Server.path + ":" + Server.port + "/robot/create",
	      data: $.param({robot:$scope.robot, token:localStorageService.get("authkey")}),
	      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		  
	  }).success(function (data) {
		  
		  window.location.href = "robot.html#" + data.robot.id;
		  
	  }).error(function (data) {
		  
		  alert("Error");
		  console.log(data);
		  
	  });
  }
});



robotDashboard.controller('RobotUpdater', function ($scope, $http, localStorageService) {

    $scope.robot = {
  	  name: "Loading...",
  	  description: "",
  	  avatar: ""
    }
    	$http({
  		method: 'POST',
  		url: "http://" + Server.path + ":" + Server.port + "/robot/id",
  	      data: $.param({id:location.hash.replace("#","").replace("/", "")}),
  		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  	}).success(function (data) {
  		console.log("Robots", data)
  		$scope.robot = data;
  	}).error(function (data) {
  	  alert("Failure");
  	});
  
  
  $scope.updateRobot = function () {
	  console.log($scope.robot);
	  $http({
	      method: 'POST',
	      url: "http://" + Server.path + ":" + Server.port + "/robot/update",
	      data: $.param({robot:$scope.robot, token:localStorageService.get("authkey")}),
	      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	  }).success(function (data) {
		  window.location.href = window.location.href.replace("update", "robot");
	  }).error(function (data) {
		  alert("Error");
		  console.log(data);
	  });
  }
});



robotDashboard.controller('AddPropertyController', function ($scope, $http, localStorageService) {

	$scope.bob = true;
    $scope.robot = {
  	  name: "Loading...",
  	  description: "",
  	  avatar: ""
    }
	
	$scope.property = {
		name: "",
		description: "",
		resourcePath: "",
		propertyType: "",
		data: {
			min: 0,
			max: 1,
			value: Math.random()
		},
		column:2
	};
	
    	$http({
  		method: 'POST',
  		url: "http://" + Server.path + ":" + Server.port + "/robot/id",
  	      data: $.param({id:location.hash.replace("#","").replace("/", "")}),
  		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  	}).success(function (data) {
  		console.log("Robots", data)
  		$scope.robot = data;
  	}).error(function (data) {
  	  alert("Failure");
  	});
  
	$scope.change = function () {
		$scope.bob = !$scope.bob;
	};
  
  $scope.addProperty = function () {
	  console.log($scope.robot);
	  $http({
	      method: 'POST',
	      url: "http://" + Server.path + ":" + Server.port + "/robot/property/create",
	      data: $.param({robot:$scope.robot, property:$scope.property, token:localStorageService.get("authkey")}),
	      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	  }).success(function (data) {
		  window.location.href = window.location.href.replace("addProperty", "robot");
	  }).error(function (data) {
		  alert("Error");
		  console.log(data);
	  });
  }
});




	


robotDashboard.controller('RobotController', function ($scope, $http, localStorageService, robotCloudDataProvider) {
  $scope.robot = {
	  name: "Loading...",
	  description: "",
	  avatar: "",
	  id: "",
  }
  
  

	  	$http({
		method: 'POST',
		url: "http://" + Server.path + ":" + Server.port + "/robot/id",
	      data: $.param({id:location.hash.replace("#","").replace("/", "")}),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data) {
		console.log("Robots", data)
		$scope.robot = data;
	}).error(function (data) {
	  alert("Failure");
	});

	
	$scope.addProperty = function () {
		window.location.href = window.location.href.replace("robot", "addProperty");
	};
	
	$scope.update = function () {
		window.location.href = window.location.href.replace("robot", "update");
	};
	
	$scope.remove = function () {

		
	  	$http({
			method: 'POST',
			url: "http://" + Server.path + ":" + Server.port + "/robot/delete",
			//{id:location.hash.replace("#","").replace("/", "")}
		      data: $.param({robot:$scope.robot, token:localStorageService.get("authkey") }),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function (data) {
			window.location.href = "caretaker.html";
		}).error(function (data) {
		  alert("Failure");
		});
	
	};
  
});