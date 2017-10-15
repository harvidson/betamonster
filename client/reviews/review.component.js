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

controller.$inject = ['$state', '$stateParams', 'reviewsService'];

function controller($state, $stateParams, reviewsService) {
  const vm = this;

  vm.$onInit = function(){

  }
}

})();
