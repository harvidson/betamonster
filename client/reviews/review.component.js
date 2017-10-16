(function() {
  'use strict';

  angular.module('app')
    .component('review', {
      controller,
      bindings: {
        review: '<'
      },
      templateUrl: '/reviews/review.template.html'
    })

  controller.$inject = ['$state', '$stateParams', 'authService', 'reviewsService'];

  function controller($state, $stateParams, authService, reviewsService) {
    const vm = this;
    vm.ownsProject = true;
    vm.ownsReview = false;
    //how do i get at review here? bindings above don't seem to do it.
    // console.log(vm.review);
    // vm.contact = vm.review.contactOkay;

    vm.$onInit = function() {
      authService.checkCookie()
        .then((data) => {
          if (data.userId === vm.review.user_id) {
            vm.ownsReview = true;
            vm.ownsProject = !vm.ownsReview
          }
        })
    }

    // TODO: write edit & delete functions & routes for my-reviews
    vm.edit = function() {

    }

    vm.delete = function() {

    }

  }

})();
