(function() {
'use strict';

angular.module('app')
  .service('authService', service)

  service.$inject = ['$http', '$state']

  function service($http, $state) {
    const vm = this;

    this.loggedIn = false;

    this.login = function(loginCred) {
      return $http.post('/api/token/', loginCred)
      .then(function(response) {
        vm.loggedIn = true;

        // TODO: //if someone has sent you a link, after login, you should get sent to that link
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
        return response;
      })
      .catch((err) => {
        console.log(err);
      })
    }

    this.logout = function() {
      return $http.delete('/api/token')
      .then(function(response) {
        vm.loggedIn = false;
        return response
      })
      .catch((err) => {
        console.log(err);
      })
    }


    this.checkCookie = function() {
      return $http.get('/api/token')
      .then(function({data}) {
        vm.loggedIn = data.authorized;
        return data
      })
      .catch((err) => {
        console.log(err);
      })
    }

    //brings up user profile data by id
    this.getUser = function(id){
      return $http.get(`/api/users/${id}`)
      .then(({data}) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
    }

    this.getDeveloper = function(projectId) {
      return $http.get(`/api/projects/${projectId}/users`)
      .then(({data}) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
    }

  }


})();
