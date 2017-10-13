(function() {
'use strict';

angular.module('app')
  .component('newReview', {
    controller,
    bindings: {
      currentProjectId: '<'
    },
    templateUrl: '/reviews/new-review.template.html'
  })

  function controller() {
    const vm = this

    vm.$onInit = function() {



    }

    vm.submitReview = function(data) {


    }





  }


})();
