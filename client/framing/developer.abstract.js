(function() {
'use strict';

angular.module('app')
  .component('devFrame', {
    controller,
    templateUrl: '/framing/developer.template.html'
  })

controller.$inject = ['$state','authService', 'projectsService']

  function controller($state, authService, projectsService) {
    const vm = this;
    vm.projectDetail = false;
    vm.activeButton = 'list'


    vm.$onInit = function() {
      authService.checkCookie()
      .then((response) => {
        if (!response.authorized) $state.go('home');
      })
      .catch((err) => {
        console.log(err);
      })
    }

    vm.logout = function(){
      authService.logout()
    }

    vm.toForm = function() {
      vm.projectDetail = false;
      vm.activeButton = 'new'
      projectsService.isEdit = false
      $state.go('projectForm')
    }

    vm.toMyProjects = function() {
      vm.projectDetail = false;
      vm.activeButton = 'list'
      $state.go('devDashboard')
    }

    vm.toDetail = function(id) {
      vm.projectDetail = true;
      vm.activeButton = 'detail'
      // TODO: add id-based pages
      // $state.go(`${id}`)
    }



  }

})();
