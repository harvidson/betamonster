(function() {
'use strict';

angular.module('app')
  .component('profile', {
    controller,
    templateUrl: '/users/profile.template.html'

  })

controller.$inject = ['authService', 'profileService']

function controller(authService, profileService) {
  const vm = this;

  vm.$onInit = function() {
    let userId;
    let user;

    authService.checkCookie()
    .then((response) => {
      userId = response.userId
      return authService.getUser(userId)
    })
    .then((user) => {
      vm.firstName = user.firstName;
      vm.lastName = user.lastName;
      vm.email = user.email;
    })
  }
}

})();
