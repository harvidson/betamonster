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

controller.$inject = ['authService'];

function controller(authService) {
  const vm = this;

  vm.$onInit = function(){
    vm.authService = authService;
  }


}

})();
