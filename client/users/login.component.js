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

    authService.login(vm.data)
    delete vm.data;
    vm.loginForm.$setPristine();
  }

  vm.cancel = function() {
    delete vm.data
    vm.loginForm.$setPristine();
  }


}


})();
