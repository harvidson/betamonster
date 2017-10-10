(function() {
'use strict';

angular.module('app')
  .component('devFrame', {
    controller,
    templateUrl: '/framing/developer.template.html'
  })

controller.$inject = ['authService']

//lots of junk in here...stopping so that i can have 3 abstracts instead
  function controller(authService) {
    const vm = this;
    //nav bar switches:
    authService.checkCookie()
    .then((response) => {
      console.log('response: ', response);
      vm.loggedIn = response;
      vm.loggedOut = !vm.loggedIn;

    })

    vm.landing;
    vm.signup;
    vm.login;


    vm.$onInit = function() {
      // vm.loggedIn = true;
      // vm.loggedOut = !vm.loggedIn;

      vm.landing = true;
      vm.signup = false;
      vm.login = false;

      vm.isDev = true;
      vm.isTest = !vm.isDev;
    }

    vm.logout = function(){
      authService.logout()
    }




  }

})();
