(function() {
'use strict';

angular.module('app')
  .component('projectForm', {
    controller,
    templateUrl: '/projects/project-form.template.html'
  })

  controller.$inject = ['$state']
  function controller($state) {
    const vm = this;

    vm.submitProject = function(){

      
    }



  }






})();
