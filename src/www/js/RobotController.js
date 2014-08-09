	


robotDashboard.controller('RobotController', function ($scope, $http) {
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
	
	
	$scope.update = function () {
		
	};
	
	$scope.remove = function () {
		alert('asdf')
		
	  	$http({
			method: 'POST',
			url: "http://" + Server.path + ":" + Server.port + "/robot/delete",
		      data: $.param({id:location.hash.replace("#","").replace("/", "")}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function (data) {
			console.log("Robots", data)
			$scope.robot = data;
		}).error(function (data) {
		  alert("Failure");
		});
	
	};
  
});