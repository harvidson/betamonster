(function() {
'use strict';

angular.module('app')
.component('tester', {
  controller,
  bindings: {
     project: '<'
   },
  templateUrl: '/dashboards/tester.template.html'
})

controller.$inject = ['authService', 'projectsService'];

function controller(authService, projectsService) {
  const vm = this;
  vm.projects = [];
  vm.project = {};
  // vm.currentProjectId;

  vm.query = '';
  vm.sortBy = ['project', 'developer'];
  vm.sortSelected = vm.sortBy[0];

  vm.$onInit = function(){
    let userId;

    authService.checkCookie()
    .then((data) => {
      userId = data.userId
      return projectsService.getProjects()
    })
    .then((projects) => {
      vm.projects = projects
    })
    .catch((err) => {
      console.log(err);
    })
  }

  projectsService.reSortPosts(vm.sortSelected)
}


})();
