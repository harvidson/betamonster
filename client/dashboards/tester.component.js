(function() {
'use strict';

angular.module('app')
.component('tester', {
  controller,
  templateUrl: '/dashboards/tester.template.html'
})

controller.$inject = ['$state', '$stateParams', '$http'];

function controller($state, $stateParams, $http) {
  const vm = this;

  vm.$onInit = function(){

  }
}


})();
