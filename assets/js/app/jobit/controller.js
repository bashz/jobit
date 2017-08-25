angular.module('jobitControllers', ['ngRoute', 'ngResource', 'ngSanitize'])
    .controller('homeController', function ($scope, Job) {
      Job.query(function (response) {
        $scope.jobs = response;
        $(".dropdown-button").dropdown();
        $('.collapsible').collapsible();
      });
    });
