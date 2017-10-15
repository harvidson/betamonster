(function() {
'use strict';

angular.module('app')
  .component('myProjectDetail', {
    controller,
    templateUrl: '/projects/my-project-detail.template.html'
  })

  controller.$inject = ['$state', '$stateParams', '$http', 'authService', 'projectsService', 'reviewsService'];

  function controller($state, $stateParams, $http, authService, projectsService, reviewsService) {
    const vm = this;
    vm.project;
    vm.reviews = []

    vm.$onInit = function(){
      vm.reviewsService = reviewsService;
      
      const projectId = $stateParams.id;

      reviewsService.getReviews(projectId)
      .then((reviews) => {
        vm.reviews = reviews
      })
      .catch((err) => {
        console.log(err);
      })
    }






  }


})();
