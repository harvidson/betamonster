(function() {
'use strict';

angular.module('app')
  .component('editProject', {
    controller,
    bindings: {
      project: '<'
    },
    templateUrl: '/projects/edit-project.template.html'
  })

  controller.$inject = ['$state', '$stateParams', 'projectsService']
  function controller($state, $stateParams, projectsService) {
    const vm = this;



    vm.$onInit = function(){

        projectsService.getProjectById($stateParams.id)
        .then((response) => {
          console.log(response);
          vm.project = response
        })
        .catch((err) => {
          console.log(err);
        })


    }

    vm.submitProject = function(e){
      e.preventDefault();
      console.log(vm.data);
      vm.data.image = 'https://upload.wikimedia.org/wikipedia/en/3/3a/Feral_goat_in_Aruba.JPG'
      projectsService.submitProject(vm.data)
      .then((project) => {
        $state.go('devDashboard')
        console.log('heres the updated project submitted ', project);
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
