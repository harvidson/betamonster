(function() {
'use strict';

angular.module('app')
.component('login', {
  controller,
  templateUrl: '/users/login.template.html'
})

controller.$inject = ['$state', 'authService']

function controller($state, authService) {
  const vm = this;


  vm.$onInit = function(){

  }

  vm.submitLogin = function(e) {
    e.preventDefault()
    console.log(vm.data);

    authService.login(vm.data)

        //if someone has sent you a link, it would be nice if, after login, you get to go to that link
        //to make the below work, would have to do a get from the db to get 'isDeveloper'
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
