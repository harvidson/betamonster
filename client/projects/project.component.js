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

controller.$inject = [];

function controller() {
  const vm = this;
  // const projectId = vm.project.id;


  vm.$onInit = function(){

  }


}

})();
