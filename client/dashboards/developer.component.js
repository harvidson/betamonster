(function() {
'use strict';

angular.module('app')
  .component('developer', {
    controller,
    templateUrl: '/dashboards/developer.template.html'
  })

  controller.$inject = ['authService', 'projectsService'];

  function controller(authService, projectsService) {
    const vm = this;

    vm.$onInit = function(){
      vm.projects = [];
      vm.project = {};
      let userId;

      authService.checkCookie()
      .then((data) => {
        userId = data.userId
        return projectsService.getMyProjects(userId)
      })
      .then((myProjects) => {
        console.log(myProjects);
        vm.projects = myProjects
      })
      .catch((err) => {
        console.log(err);
      })


    }

    vm.logout = function(){
      authService.logout()
    }
  }


})();
