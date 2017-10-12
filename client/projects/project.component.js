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

controller.$inject = ['$state', '$stateParams'];

function controller($state, $stateParams) {
  const vm = this;

  vm.$onInit = function(){

  }
}

})();
