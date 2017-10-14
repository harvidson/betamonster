(function() {
'use strict';

angular.module('app')
  .component('reviewForm', {
    controller,
    templateUrl: '/reviews/review-form.template.html'
  })

  controller.$inject = ['$state','$stateParams', 'reviewsService'];

  function controller($state, $stateParams, reviewsService) {
    const vm = this;
    const projectId = $stateParams.id;

    vm.$onInit = function() {



    }

    vm.submitReview = function(e) {
      e.preventDefault();
      vm.data.projectId = projectId;

      reviewsService.submitReview(vm.data)
      .then((response) => {
        console.log(response);
        vm.reviewForm.$setPristine();
        $state.go('testDashboard')
      })
      .catch((err) => {
        console.log(err);
      })
    }

    vm.cancel = function() {
      delete vm.data
      vm.reviewForm.$setPristine();

      $state.go('testDashboard')
    }




  }


})();
