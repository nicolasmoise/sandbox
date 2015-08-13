'use strict';

var app = angular.module('nm-sandbox', ['ngRoute']);



app.provider('sbRoutes', function() {

  this.routes = [
    {
      name: 'add',
      title: 'Create',
      templateUrl: 'add-page'
    }, {
      name: 'members',
      title: 'Members',
      templateUrl: 'members-page'
    }, {
      name: 'about',
			title: 'About',
			templateUrl: 'about-page'
		}, {
			name: 'contact',
			title: 'Contact',
			templateUrl: 'contact-page'
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
			redirectTo: '/add'
		});

		$locationProvider.html5Mode(true);
	}
]);

app.controller('menuController', ['$route', 'sbRoutes', '$scope', function($route, sbRoutes, $scope){
  $scope.sbRoutes = sbRoutes;
  $scope.$route = $route;
}]);

app.controller('addController', ['$scope', 'Members', function($scope, Members){

  $scope.newMember = {};

  $scope.addMember = function(){
    Members.create($scope.newMember);
    $scope.newMember = {};
  };
}]);

app.controller('membersController', ['$scope', 'Members', function($scope, Members){
  $scope.members = Members.get();

  $scope.deleteMember = function(index){
    Members.delete(index);
  }

}]);

app.service('Members', [function(){
  var members = [{
    firstName: 'Nicolas',
    lastName: 'Moise',
    phoneNumber: '514-245-6074'
  }];

  this.create = function(member){
    members.push(member);
  };

  this.get = function(){
    return members;
  };

	this.delete = function(index){
		members.splice(index, 1);
	}
}]);
