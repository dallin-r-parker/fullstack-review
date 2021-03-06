'use strict';

angular.module('app', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		templateUrl: './app/views/home.html'
	}).state('login', {
		url: '/login',
		templateUrl: './app/views/login.html',
		controller: 'authCtrl'
	}).state('register', {
		url: '/register',
		templateUrl: './app/views/register.html',
		controller: 'authCtrl'
	});
});
'use strict';

angular.module('app').controller('authCtrl', function ($scope, authService, $state) {

	$scope.login = function (user) {
		authService.loginUser(user).then(function (res) {
			if (res.data.length > 0) {
				$state.go('home');
			} else {
				alert('Too Bad');
			}
		});
	};

	$scope.register = function (user) {
		authService.registerUser(user).then(function (res) {
			console.log('Controller Promise', res);
		});
	};
});
'use strict';

angular.module('app').service('authService', function ($http) {

	this.registerUser = function (user) {
		return $http({
			url: '/api/create-user',
			method: 'POST',
			data: user
		});
	};

	this.loginUser = function (user) {
		return $http({
			url: '/api/login-user',
			method: 'POST',
			data: user
		});
	};
});