(function() {
  'use strict';

  angular.module('app')
    .component('home', {
      controller,
      templateUrl: '/home/home.template.html'
    })

  controller.$inject = ['projectsService'];

  function controller(projectsService) {
    const vm = this;
    vm.landing = true;
    vm.projects = [];
    vm.query = '';
    vm.sortBy = ['project', 'developer'];
    vm.sortSelected = vm.sortBy[0];

    vm.$onInit = function() {
      projectsService.getProjects()
        .then((projects) => {
          vm.projects = projects
          console.log(vm.projects);
        })
    }

    projectsService.reSortPosts(vm.sortSelected)


  }


})();
