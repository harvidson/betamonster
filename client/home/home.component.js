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

    vm.$onInit = function(){
      projectsService.getProjects()
      .then((projects) => {
        vm.projects = projects
      })
    }
  }


})();
