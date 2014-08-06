var Server = {
	path: "localhost",
	port: "9393"
};


var robotDashboard = angular.module('RobotDashboard', []);

robotDashboard.controller('AccountController', function ($scope, $http) {
	
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
			}).success(function () {
				window.location.href = "caretaker.html";
		  }).error(function () {
			  alert("Failure");
		  })
		
		
		//window.location.href = "caretaker.html";
		
	};
	
});

robotDashboard.controller('CareTakerController', function ($scope) {
  $scope.caretaker = {
	  name: "Dave",
	  credentials: {
		  avatar: "http://www.woodcockswell.ik.org/img/Staff_and_Other_Members/caretaker.jpg"
	  },
	  notifications: [
	  {},
	  {}
	  ]
  }
  

	$scope.addRobot = function () {
		window.location.href="addRobot.html";
	};
	
	$scope.settings = function () {
		window.location.href="settings.html";
	};
});

robotDashboard.controller('RobotOverviewController', function ($scope) {
  $scope.robot = {
	  name: "Earthworm Jim",
	  description: "Automated Earthworm w/ Lasers",
	  avatar: "http://fc04.deviantart.net/fs12/i/2006/276/8/4/Earthworm_Jim_by_BlackBeret.jpg"
  }
});


robotDashboard.controller('RobotsList', function ($scope) {
	
	
  $scope.robots = [
  {
  	  name: "Earthworm Jim",
  	  description: "Automated Earthworm w/ Lasers",
  	  avatar: "http://fc04.deviantart.net/fs12/i/2006/276/8/4/Earthworm_Jim_by_BlackBeret.jpg"
  },
  {
  	  name: "Plantoid",
  	  description: "Hybrid Organic Robot",
  	  avatar: "http://www.plantoidrobotics.org/images/thumb/3/37/OrbousandPlantServer.jpg/320px-OrbousandPlantServer.jpg"
  },
  {
  	  name: "Earthworm Jim",
  	  description: "Automated Earthworm w/ Lasers",
  	  avatar: "http://fc04.deviantart.net/fs12/i/2006/276/8/4/Earthworm_Jim_by_BlackBeret.jpg"
  },
  {
  	  name: "Plantoid",
  	  description: "Hybrid Organic Robot",
  	  avatar: "http://www.plantoidrobotics.org/images/thumb/3/37/OrbousandPlantServer.jpg/320px-OrbousandPlantServer.jpg"
  },
  {
  	  name: "Earthworm Jim",
  	  description: "Automated Earthworm w/ Lasers",
  	  avatar: "http://fc04.deviantart.net/fs12/i/2006/276/8/4/Earthworm_Jim_by_BlackBeret.jpg"
  },
  {
  	  name: "Plantoid",
  	  description: "Hybrid Organic Robot",
  	  avatar: "http://www.plantoidrobotics.org/images/thumb/3/37/OrbousandPlantServer.jpg/320px-OrbousandPlantServer.jpg"
  }
  ];
  
  $scope.showRobot = function (index) {
	  console.log($scope.robots[index]);
	  window.location.href = "robot.html";
  }
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
	      data: $.param($scope.robot),
	      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	  });
  }
});