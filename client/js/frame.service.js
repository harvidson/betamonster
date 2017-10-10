(function() {
'use strict';

angular.module('app')
  .component('frameService', service)

  service.$inject = ['$http']

  function service($http) {
    this.checkCookie = function() {
      $http.get
    }

  }

})();
