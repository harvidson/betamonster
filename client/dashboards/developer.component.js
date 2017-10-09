(function() {
'use strict';

angular.module('app')
  .component('developer', {
    controller,
    templateUrl: '/dashboards/developer.template.html'
  })

  controller.$inject = ['$state', '$stateParams', '$http', 'authService'];

  function controller($state, $stateParams, $http, authService) {
    const vm = this;

    vm.$onInit = function(){

    }

    vm.logout = function(){
      authService.logout()
    }
  }


})();
