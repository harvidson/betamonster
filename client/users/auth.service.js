(function() {
'use strict';

angular.module('app')
  .service('authService', service)

  service.$inject = ['$http', '$state']

  function service($http, $state) {

    this.login = function(loginCred) {
      return $http.post('/api/token/', loginCred)
      .then(function(response) {

        //if someone has sent you a link, it would be nice if, after login, you get to go to that link
        //to make the below work, would have to do a get from the db to get 'isDeveloper'
        if (response.data.isDeveloper === true) {
          $state.go('devDashboard')
        } else {
          $state.go('testDashboard')
        }
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

    this.logout = function() {
      console.log('inside logout');
      return $http.delete('/api/token')
      .then(function(response) {
        console.log('response after api call', response);

        return response
      })
      .catch((err) => {
        console.log(err);
      })
    }


    this.checkCookie = function() {
      return $http.get('/api/token')
      .then(function(response) {
        return response.data
      })
      .catch((err) => {
        console.log(err);
      })
    }
 


  }


})();
