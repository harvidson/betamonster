(function() {
'use strict';

angular.module('app')
.component('signup', {
  controller,
  templateUrl: '/users/signup.template.html'
})

controller.$inject = ['$state', 'authService']

function controller($state, authService) {
  const vm = this;


  vm.$onInit = function(){
    // const vm.passwordLength = 0;

  }

  vm.submitSignup = function(e) {
    e.preventDefault()
    authService.signup(vm.data)
    .then(() => {
      vm.navigateToPage('login')
    })
    .catch((err) => {
      console.log(err);
    })


    delete vm.data;
    vm.signupForm.$setPristine();
  }

  vm.cancel = function() {
    delete vm.data
    vm.signupForm.$setPristine();
    $state.go('home')
  }



  // vm.matchPassword = function() {
  //   if (vm.data.password !== vm.data.confirm.password) {
  //
  //   }
  // }

}


})();
