(function() {
'use strict';

angular.module('app')
  .service('profileService', service)

  service.$inject = ['$http', '$state']

  function service($http, $state) {

    this.getUser = function(id){
      console.log(id);
      return $http.get(`/api/users/${id}`)
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      })
    }

    this.loadProfile = function(id) {
      return this.getUser(id)
      .then(({data}) => {
        return data

      })
    }



  }


})();
