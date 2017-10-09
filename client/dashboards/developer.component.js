(function() {
'use strict';

angular.module('app')
  .component('developer', {
    controller,
    templateUrl: '/dashboards/developer.template.html'
  })

  controller.$inject = ['$state', '$stateParams', '$http'];

  function controller($state, $stateParams, $http) {
    const vm = this;

    vm.$onInit = function(){

    }
  }


})();
