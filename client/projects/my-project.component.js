(function() {
'use strict';

angular.module('app')
.component('myProject', {
  controller,
  templateUrl: '/projects/my-project.template.html'
})

controller.$inject = ['$state', '$stateParams', '$http'];

function controller($state, $stateParams, $http) {
  const vm = this;

  vm.$onInit = function(){
    
  }
}

})();
