(function() {
'use strict';

angular.module('app')
.component('myProject', {
  controller,
  bindings: {
     project: '<'
  },
  templateUrl: '/projects/my-project.template.html'
})

controller.$inject = ['$state', 'projectsService'];

function controller($state, projectsService) {
  const vm = this;
  vm.project;

  vm.$onInit = function(){
    vm.myProjects = true;

  }

  vm.toDetail = function() {
    $state.go('projectDetail', { id: vm.project.id })
  }
}

})();
