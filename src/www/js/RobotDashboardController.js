

window.robotDashboard.controller("RobotDashboardController", function ($scope, parallaxHelper) {
	
    $scope.background = parallaxHelper.createAnimator(0.1);
    $scope.foreground = parallaxHelper.createAnimator(-0.3);
	
});