angular.module('jobitControllers', ['ngRoute', 'ngResource', 'ngSanitize'])
    .controller('homeController', function ($scope, Job) {
      load = function (page, firstLoad) {
        Job.query({page: page}, function (response) {
          $scope.jobs = response;
          if (firstLoad) {
            $(".dropdown-button").dropdown();
            $('.collapsible').collapsible();
          }
        });
      };

      if (!$scope.pages) {
        Job.count(function (response) {
          var total = Math.ceil(response.total / 50);
          var pages = new Array(total);
          for (var i = 0; i < pages.length; ) {
            pages[i] = i++;
          }
          $scope.pages = {pages: pages, current: 0};
          load($scope.pages.current, true);
        });
      }

      $scope.navigate = function (page) {
        $scope.pages.current = page;
        load($scope.pages.current, false);
      };
    })
    .controller('jobController', function ($scope, $routeParams, Job) {
      Job.get({id: $routeParams.id}, function (response) {
        $scope.job = response;
      });
    });
