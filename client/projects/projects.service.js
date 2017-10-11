(function() {
  'use strict';

  angular.module('app')
    .service('projectsService', service)

  service.$inject = ['$http', '$state', 'authService']

  function service($http, $state, authService) {

// TODO: count here is counting 'reviews' (as in review batches, not number of answers associated with the question associated with the review)
    this.getMyProjects = function(userId) {
      return $http.get(`/api/users/${userId}/projects`)
        .then(({
          data
        }) => {
          return data
        })
        .catch((err) => {
          console.log(err);
        })
    }

    this.submitProject = function(project) {
      console.log('this is project at projectsService ', project);
      return $http.post('/api/projects', project)
      .then(({data}) => {
        console.log(data);
        return data
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      })
    }




  }


})();
