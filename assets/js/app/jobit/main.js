var app = angular.module('jobit', ['jobitService', 'jobitControllers']);
app.config(function ($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'templates/jobit/home.html',
        controller: 'homeController'
      }).when('/job/:id', {
        templateUrl: 'templates/jobit/job.html',
        controller: 'jobController'
      });
});