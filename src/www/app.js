var Server = {
	path: "localhost",
	port: "9392"
};

// if (localStorage.getItem("authkey")) {
// 	alert("authenticated");
// }


var robotDashboard = angular.module('RobotDashboard', []);

robotDashboard.controller('AccountController', function ($scope, $http) {
	
	if (localStorage.getItem("authkey") && localStorage.getItem("authkey") !== "undefined" && document.getElementById("login-form")) {
		window.location.href = "caretaker.html";
	}
	
	$scope.username = "";
	$scope.password = "";
	
	$scope.isAuthenticated = true;
	
	$scope.login = function () {
		
		// $scope.isAuthenticated = false;
		console.log($scope.username, $scope.password);
		
		$http({
			method: 'POST',
			url: "http://" + Server.path + ":" + Server.port + "/user/login",
			data: $.param({
				username:$scope.username,
				password:$scope.password
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function (data) {
				

				localStorage.setItem("authkey", data.replace("\"", '').replace("\"", ''));
				localStorage.setItem("username", $scope.username);
				window.location.href = "caretaker.html";
		  }).error(function () {
			  alert("Failure");
		  })
		
		
		//window.location.href = "caretaker.html";
		
	};
	
});

robotDashboard.controller('CareTakerController', function ($scope, $http) {
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
		username:localStorage.getItem("username"),
	}),
	headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data) {
		
		$scope.caretaker.name = data.user.name;
		console.log("post",data)
		
  }).error(function () {
	  alert("Failure");
  })
  

$scope.logout = function () {
	$http({
		method: 'POST',
		url: "http://" + Server.path + ":" + Server.port + "/user/logout",
		data: $.param({
			username:localStorage.getItem("username"),
		}),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data) {
		
		localStorage.setItem("authkey", undefined);
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
});

robotDashboard.controller('RobotOverviewController', function ($scope, $http) {
  $scope.robot = {
	  name: "Loading...",
	  description: "",
	  avatar: ""
  }
  	$http({
		method: 'POST',
		url: "http://" + Server.path + ":" + Server.port + "/robot/id",
	      data: $.param({id:location.hash.replace("#","")}),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data) {
		console.log("Robots", data)
		$scope.robot = data;
	}).error(function (data) {
	  alert("Failure");
	})
  
});


robotDashboard.controller('RobotsList', function ($scope, $http) {
	
	
  $scope.robots = [
  ];
  
  $scope.showRobot = function (index) {
	  console.log($scope.robots[index]);
	  window.location.href = "robot.html#"+$scope.robots[index].id;
  }
  window.$http = $http;
	$http({
		method: 'POST',
		url: "http://" + Server.path + ":" + Server.port + "/robots/list",
	      data: $.param({username:localStorage.username}),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function (data) {
		console.log("Robots", data)
		$scope.robots = data;
	}).error(function (data) {
	  alert("Failure");
	})
  
});



robotDashboard.controller('RegisterController', function ($scope, $http) {

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
		  alert("Success");
	  }).error(function () {
		  alert("Failure");
	  })
	};
	
	console.log($scope);
});



robotDashboard.controller('RobotCreator', function ($scope, $http) {
  $scope.robot = {
	  name: "",
	  description: "",
	  avatar: ""
  };
  
  $scope.addRobot = function () {
	  console.log($scope.robot);
	  $http({
	      method: 'POST',
	      url: "http://" + Server.path + ":" + Server.port + "/robot/create",
	      data: $.param({robot:$scope.robot, token:localStorage.authkey}),
	      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	  }).success(function (data) {
		  window.location.href = "caretaker.html";
	  }).error(function (data) {
		  alert("Error");
		  console.log(data);
	  });
  }
});