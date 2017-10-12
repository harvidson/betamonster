(function() {
'use strict';

angular.module('app')
  .component('projectForm', {
    controller,
    templateUrl: '/projects/project-form.template.html'
  })

  controller.$inject = ['$state', 'projectsService']
  function controller($state, projectsService) {
    const vm = this;

    vm.submitProject = function(e){
      e.preventDefault();
      console.log(vm.data);
      vm.data.image = 'https://upload.wikimedia.org/wikipedia/en/3/3a/Feral_goat_in_Aruba.JPG'
      projectsService.submitProject(vm.data)
      .then((project) => {
        $state.go('devDashboard')
        console.log('heres the new project submitted ', project);
      })
      .catch((err) => {
        console.log(err);
      })

    }

    vm.cancel = function() {
      delete vm.data
      vm.projectForm.$setPristine();
    }


  }






})();
