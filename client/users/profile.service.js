(function() {
'use strict';

angular.module('app')
  .service('profileService', service)

  service.$inject = ['$http', '$state']

  function service($http, $state) {

    // this.loadProfile = function(id) {
    //   return authService.getUser(id)
    //   .then(({data}) => {
    //     console.log(data);
    //     return data
    //   })
    // }



  }


})();
