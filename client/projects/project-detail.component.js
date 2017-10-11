(function() {
'use strict';

angular.module('app')
  .component('projectDetail', {
    controller,
    templateUrl: '/projects/project-detail.template.html'
  })

  controller.$inject = ['$state', '$stateParams', '$http', 'authService', 'projectsService'];

  function controller($state, $stateParams, $http, authService, projectsService) {
    const vm = this;

    vm.$onInit = function(){
      let userId;

      authService.checkCookie()
      .then((data) => {
        userId = data.userId
        console.log('userId', userId);

      })
      .catch((err) => {
        console.log(err);
      })


    }

  }


})();
