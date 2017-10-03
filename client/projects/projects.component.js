(function() {
'use strict';

angular.module('app')
.component('projects', {
  controller,
  templateUrl: '/projects/projects.template.html'
})

controller.$inject = ['$state', '$stateParams', '$http'];

function controller($state, $stateParams, $http) {
  const vm = this;

  vm.$onInit = function(){

  }
}

})();
