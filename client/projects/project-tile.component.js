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
    vm.developer = {}

    vm.$onInit = function(){
      let userId;
      const projectId = $stateParams.id;

      projectsService.getProjectById(projectId)
      .then((project) => {
        vm.project = project;
        return projectsService.getQuestion(projectId)
      })
      .then((question) => {
        vm.project.question = question;

        //find out whether this project belongs to current user (if yes, edit/delete buttons will be available)
        return authService.checkCookie()
      })
      .then((data) => {
        if (data.userId === vm.project.user_id) {
          vm.ownsProject = true;
          vm.isVisitor = !vm.ownsProject
        }
        return authService.getDeveloper(projectId)
      })
      .then((data) => {
        vm.project.developerFirstName = data.developerFirstName;
        vm.project.developerLastName = data.developerLastName;
      })
      .catch((err) => {
        console.log(err);
      })

    }

    vm.edit = function() {
      projectsService.isEdit = true;
      $state.go('editProject', { id: vm.project.id })
    }

    // TODO: add unpublish; filter results on devDashboard and landing so that unpublished projects show under their own heading
    vm.unpublish = function() {
      projectsService.unpublishProject(vm.project.id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      })
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
