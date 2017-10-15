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
  // const projectId = vm.project.id;


  vm.$onInit = function(){
    vm.authService = authService;
  }


}

})();
