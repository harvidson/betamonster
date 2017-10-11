(function() {
'use strict';

angular.module('app')
  .component('developer', {
    controller,
    templateUrl: '/dashboards/developer.template.html'
  })

  controller.$inject = ['$state', '$stateParams', '$http', 'authService', 'projectsService'];

  function controller($state, $stateParams, $http, authService, projectsService) {
    const vm = this;

    vm.$onInit = function(){
      vm.projects;
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
