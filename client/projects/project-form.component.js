(function() {
'use strict';

angular.module('app')
  .component('projectForm', {
    controller,
    bindings: {
      project: '<'
    },
    templateUrl: '/projects/project-form.template.html'
  })

  controller.$inject = ['$state', '$stateParams', 'projectsService']
  function controller($state, $stateParams, projectsService) {
    const vm = this;

    vm.$onInit = function(){
      vm.project = {};
      vm.projectsService = projectsService

      if($stateParams.id) {
        projectsService.getProjectById($stateParams.id)
        .then((response) => {
          vm.data = response
          console.log(vm.data);
        })
        .catch((err) => {
          console.log(err);
        })
      }

    }

    vm.submitProject = function(e){
      e.preventDefault();
      vm.data.image = 'https://upload.wikimedia.org/wikipedia/en/3/3a/Feral_goat_in_Aruba.JPG'
      projectsService.submitProject(vm.data)
      .then((project) => {
        $state.go('devDashboard')
        vm.projectsService.isEdit = false;
      })
      .catch((err) => {
        console.log(err);
      })

    }

    vm.updateProject = function() {
      vm.data.image = 'http://news.nationalgeographic.com/content/dam/news/2017/04/27/frog-gallery/01-frog-day-gallery.jpg'
      projectsService.editProject($stateParams.id, vm.data)
      .then((project) => {
        $state.go('devDashboard')
        vm.projectsService.isEdit = false;
      })
      .catch((err) => {
        console.log(err);
      })
    }

    vm.cancel = function() {
      delete vm.data
      vm.projectForm.$setPristine();
      vm.projectsService.isEdit = false;
      $state.go('devDashboard')
    }

  }




})();
