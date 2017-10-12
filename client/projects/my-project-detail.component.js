(function() {
'use strict';

angular.module('app')
  .component('myProjectDetail', {
    controller,
    templateUrl: '/projects/my-project-detail.template.html'
  })

  controller.$inject = ['$state', '$stateParams', '$http', 'authService', 'projectsService'];

  function controller($state, $stateParams, $http, authService, projectsService) {
    const vm = this;
    vm.project;

    vm.$onInit = function(){
      let userId;
      const projectId = $stateParams.id;

      // TODO: why am i chekcing the cookie here? so that i can check if is-self? allow for edit & delete?
      // authService.checkCookie()
      // .then((data) => {
      //   userId = data.userId
      //
      // })
      // .catch((err) => {
      //   console.log(err);
      // })

      // projectsService.getProjectById(projectId)
      // .then((project) => {
      //   console.log('project: ', project);
      //   vm.project = project;
      //   console.log(vm.project.image);
      //   return projectsService.getQuestion(projectId)
      // })
      // .then((question) => {
      //   vm.project.question = question;
      // })
      // .catch((err) => {
      //   console.log(err);
      // })
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
