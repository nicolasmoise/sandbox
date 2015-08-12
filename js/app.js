'use strict';

var app = angular.module('kc-projects', ['ngRoute']);



app.provider('kcRoutes', function() {
    
    this.routes = [
		{
			name: 'home',
			title: 'Home',
			templateUrl: 'home-page'
		}, {
			name: 'projects',
			title: 'Projects',
			templateUrl: 'projects-page'
		}, {
			name: 'contact',
			title: 'Contact Us',
			templateUrl: 'contact-page'
		}, {
			name: 'portfolio',
			title: 'Portfolio',
			templateUrl: 'portfolio-page'
		}
	];

    var _this = this;
    this.$get = function() {
        return _this.routes;
    };
});

app.config(['$routeProvider', '$locationProvider', 'kcRoutesProvider', 

	function($routeProvider, $locationProvider, kcPagesProvider){

		kcPagesProvider.routes.map(function(page){
			$routeProvider.when('/' + page.name, { templateUrl: page.templateUrl });
		});

		$routeProvider.otherwise({
			redirectTo: '/home'
		});

		$locationProvider.html5Mode(true);
	}
]);

app.controller('kcMainController', ['$route', 'kcRoutes', '$scope', function($route, kcRoutes, $scope){
	$scope.kcRoutes = kcRoutes;
	$scope.$route = $route;
}])