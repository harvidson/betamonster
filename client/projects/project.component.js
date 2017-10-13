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

controller.$inject = ['$state', '$stateParams', 'authService'];

function controller($state, $stateParams, authService) {
  const vm = this;
  // const projectId = vm.project.id;


  vm.$onInit = function(){
    //local version of authService
    vm.authService = authService
    console.log(vm.authService);
  }

//   vm.review = function() {
//     console.log('time to review');
// //is this a way to pass projectId to review form? or bindings is better?
//     reviewsService.prepareForm(projectId)
//   }
}

})();
