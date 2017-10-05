(function() {
'use strict';

angular.module('app')
.component('signup', {
  controller,
  templateUrl: '/users/signup.template.html'
})

controller.$inject = ['$state']

function controller($state) {
  const vm = this;


  vm.$onInit = function(){
    // const vm.passwordLength = 0;

  }

  vm.submitSignup = function(e) {
    e.preventDefault()
    console.log(vm.data);

    vm.navigateToPage('login')

    delete vm.data;
    vm.signupForm.$setPristine();
  }

  vm.cancel = function() {
    delete vm.data
    vm.signupForm.$setPristine();
    vm.navigateToPage('/')
  }

  vm.navigateToPage = function(pageName) {
    $state.go(pageName)
  }

  // vm.matchPassword = function() {
  //   if (vm.data.password !== vm.data.confirm.password) {
  //
  //   }
  // }

}


})();
