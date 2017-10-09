(function() {
'use strict';

angular.module('app')
  .service('authService', service)

  service.$inject = ['$http']

  function service($http) {

    this.login = function(loginCred) {
      console.log('inside login');
      return $http.post('/api/token/', loginCred)
      .then(function(response) {
        console.log('response after api call', response);
        return response
      })
      .catch((err) => {
        console.log(err);
      })
    }

    this.signup = function(signupData) {
      return $http.post('/api/users/', signupData)
      .then(function(response) {
        console.log('response after api call', response);
        return response;
      })
      .catch((err) => {
        console.log(err);
      })
    }

  }


})();
