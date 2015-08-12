'use strict';

var app = angular.module('nm-sandbox', ['ngRoute']);



app.provider('sbRoutes', function() {
    
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

app.config(['$routeProvider', '$locationProvider', 'sbRoutesProvider', 

	function($routeProvider, $locationProvider, sbPagesProvider){

		sbPagesProvider.routes.map(function(page){
			$routeProvider.when('/' + page.name, { templateUrl: page.templateUrl });
		});

		$routeProvider.otherwise({
			redirectTo: '/home'
		});

		$locationProvider.html5Mode(true);
	}
]);

app.controller('mainController', ['$route', 'sbRoutes', '$scope', function($route, sbRoutes, $scope){
	$scope.sbRoutes = sbRoutes;
	$scope.$route = $route;
}])