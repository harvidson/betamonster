(function() {
'use strict';

angular.module('app')
.component('tester', {
  controller,
  templateUrl: '/dashboards/tester.template.html'
})

// controller.$inject = ['$state', '$stateParams'];

function controller() {
  const vm = this;

  vm.$onInit = function(){

  }
}


})();
