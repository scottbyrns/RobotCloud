
var robotDashboard = angular.module('RobotDashboard', []);

robotDashboard.controller('AccountController', function ($scope) {
	
	$scope.username = "";
	$scope.password = "";
	
	$scope.isAuthenticated = true;
	
	$scope.login = function () {
		
		$scope.isAuthenticated = false;
		console.log($scope.username, $scope.password);
		window.location.href = "caretaker.html";
		
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