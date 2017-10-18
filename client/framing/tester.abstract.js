(function() {
'use strict';

angular.module('app')
  .component('testFrame', {
    controller,
    templateUrl: '/framing/tester.template.html'
  })

controller.$inject = ['$state','authService']

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
