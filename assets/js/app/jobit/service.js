angular.module('jobitService', [])
    .factory('Job', function ($resource) {
      return $resource('/job/:id', {id: '@_id'}, {

      });
    });