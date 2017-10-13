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
    vm.isVisitor = true;

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
          vm.isVisitor = !vm.ownsProject
        }
      })
      .catch((err) => {
        console.log(err);
      })

    }

    // TODO: add edit
    vm.edit = function() {

    }

    // TODO: add unpublish; filter results on devDashboard and landing so that unpublished either don't show or show under their own heading
    vm.unpublish = function() {

    }

    vm.delete = function() {
      projectsService.deleteProject(vm.project.id)
      .then((reponse) => {
        $state.go('devDashboard')
      })
      .catch((err) => {
        console.log(err);
      })
    }

  }


})();
