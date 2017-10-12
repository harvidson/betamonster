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
    vm.reviews = [{title: 'reviewA'}, {title: 'reviewB'}, {title: 'reviewC'}]

    vm.$onInit = function(){
      let userId;
      const projectId = $stateParams.id;

      reviewsService.getReviews(projectId)
      .then((reviews) => {
        console.log('reviews from my-project-detail ', reviews);
        vm.reviews = reviews
      })
      .catch((err) => {
        console.log(err);
      })
    }



  }


})();
