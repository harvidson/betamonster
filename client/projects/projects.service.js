(function() {
'use strict';

angular.module('app')
  .service('projectsService', service)

  service.$inject = ['$http', '$state', 'authService']

  function service($http, $state, authService) {

    this.getMyProjects = function(userId){
      console.log('trying to get projects!');
      console.log('userId ', userId);
      return $http.get(`/api/users/${userId}/projects`)
    .then(({data}) => {
      console.log(data);
      return data
    })
    .catch((err) => {
      console.log(err);
    })
  }



  }


})();
