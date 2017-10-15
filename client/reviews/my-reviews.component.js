(function() {
'use strict';

angular.module('app')
.component('myReviews', {
  controller,
  templateUrl: '/reviews/my-reviews.template.html'
})

controller.$inject = ['authService', 'reviewsService'];

function controller(authService, reviewsService) {
  const vm = this;
  vm.userId;
  vm.reviews = [];

  vm.$onInit = function(){

    authService.checkCookie()
    .then((data) => {
      vm.userId = data.userId
      return reviewsService.getMyReviews(vm.userId)
    })
    .then((reviews) => {
      vm.reviews = reviews
    })
    .catch((err) => {
      console.log(err);
    })
  }

}


})();
