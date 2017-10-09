(function() {
'use strict';

angular.module('app')
  .component('framing', {
    controller,
    templateUrl: '/js/frame.template.html'
  })

  function controller() {
    const vm = this;
    console.log('framing')
  }

})();
