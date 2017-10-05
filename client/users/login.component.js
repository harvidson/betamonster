(function() {
'use strict';

angular.module('app')
.component('login', {
  controller,
  templateUrl: '/users/login.template.html'
})

function controller() {
  const vm = this;


  vm.$onInit = function(){

  }

  vm.submitLogin = function(e) {
    e.preventDefault()
    console.log(vm.data);


        //if someone has sent you a link, it would be nice if, after login, you get to go to that link
    if (vm.data.isDeveloper === "true") {
      console.log('developer');
    } else {
      vm.navigateToPage('tester')
    }

    delete vm.data;
    vm.loginForm.$setPristine();
  }

  vm.cancel = function() {
    delete vm.data
    vm.loginForm.$setPristine();
  }
//change this: it repeats across signup and login
  vm.navigateToPage = function(pageName) {
    $state.go(pageName)
  }

}


})();
