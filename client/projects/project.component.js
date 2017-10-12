(function() {
'use strict';

angular.module('app')
.component('project', {
  controller,
  bindings: {
     project: '<'
   },
  templateUrl: '/projects/project.template.html'
})

controller.$inject = ['$state', '$stateParams', '$http'];

function controller($state, $stateParams, $http) {
  const vm = this;

  vm.$onInit = function(){

  }
}

})();
