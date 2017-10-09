(function() {
'use strict';

angular.module('app')
  .component('framing', {
    controller,
    templateUrl: '/js/frame.template.html'
  })

  function controller() {
    const vm = this;
    vm.isTest = true;
    vm.isDev = false;




    console.log('framing')
  }

})();
