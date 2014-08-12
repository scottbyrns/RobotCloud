(function() {
/* Start angularLocalStorage */
'use strict';
var robotCloudDataProvider = angular.module('RobotCloudDataProvider', []);

robotCloudDataProvider.provider('robotCloudDataProvider', function() {
  
  this.$get = ['$rootScope', '$window', '$document', 'localStorageService', function($rootScope, $window, $document, localStorageService) {
    return {
		
		userIsAuthenticated: function () {
			return localStorageService.get("authkey") && localStorageService.get("authkey") !== "undefined";
		},
		
		validateToken: function (token, $http, success, error) {
			
		  	$http({
				
				method: 'POST',
				url: "http://" + Server.path + ":" + Server.port + "/robot/id",
			    data: $.param({token:token}),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				
			}).success(success).error(error);
			
		},
		
		getUserByToken: function (token, $http) {
			
			
			console.log("asdf")
			
		}
		
    };
  }];
});
}).call(this);
