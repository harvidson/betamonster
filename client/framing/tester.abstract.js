(function() {
'use strict';

angular.module('app')
  .component('testFrame', {
    controller,
    templateUrl: '/framing/tester.template.html'
  })

controller.$inject = ['$state','authService']

//lots of junk in here...stopping so that i can have 3 abstracts instead
  function controller($state, authService) {
    const vm = this;
    vm.activeButton = 'list'

    //nav bar switches:
    vm.authService = authService;

    vm.$onInit = function() {

    }

    vm.logout = function(){
      authService.logout()
    }

    vm.toMyReviews = function() {
      vm.newReview = false;
      vm.activeButton = 'reviews'
      $state.go('myReviews')
    }


  }

})();
