(function() {
'use strict';

angular.module('app')
.component('home', {
  controller,
  templateUrl: '/home/home.template.html'
})

controller.$inject = ['$state', '$stateParams', '$http'];

function controller($state, $stateParams, $http) {
  const vm = this;

  vm.$onInit = function(){

  }
}


})();
