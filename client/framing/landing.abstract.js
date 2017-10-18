(function() {
'use strict';

angular.module('app')
  .component('landing', {
    controller,
    templateUrl: '/framing/landing.template.html'
  })

controller.$inject = ['$state', 'authService']

  function controller($state, authService) {
    const vm = this;

    vm.$onInit = function() {


      return authService.checkCookie()
      .then((response) => {
        if (response.authorized) {
          if (response.isDev) {
            $state.go('devDashboard')
          } else {
            $state.go('testDashboard')
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })

    }

  }

})();
