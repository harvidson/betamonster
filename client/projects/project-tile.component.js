(function() {
'use strict';

angular.module('app')
  .component('projectTile', {
    controller,
    templateUrl: '/projects/project-tile.template.html'
  })

  controller.$inject = ['$state', '$stateParams', 'authService', 'projectsService'];

  function controller($state, $stateParams, authService, projectsService) {
    const vm = this;
    vm.project;
    vm.ownsProject = false;

    vm.$onInit = function(){
      let userId;
      const projectId = $stateParams.id;

      projectsService.getProjectById(projectId)
      .then((project) => {
        console.log('getting project via project-tile: ', project);
        vm.project = project;
        return projectsService.getQuestion(projectId)
      })
      .then((question) => {
        vm.project.question = question;

        //find out whether this project belongs to current user (if yes, edit/delete buttons will be avail)
        return authService.checkCookie()
      })
      .then((data) => {
        if (data.userId === vm.project.user_id) {
          vm.ownsProject = true;
        }
      })
      .catch((err) => {
        console.log(err);
      })





    }

  }


})();
