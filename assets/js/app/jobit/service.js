angular.module('jobitService', [])
    .factory('Job', function ($resource) {
      return $resource('/job/:id', {id: '@_id'}, {
        count: {
          method: 'GET',
          url: '/job/count'
        },
        pull: {
          method: 'GET',
          url: '/job/pull'
        }
      });
    });