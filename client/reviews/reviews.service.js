(function() {
  'use strict';

  angular.module('app')
    .service('reviewsService', service)

  service.$inject = ['$http', '$state', 'authService']

  function service($http, $state, authService) {

    this.getReviews = function(projectId) {
      return $http.get(`/api/projects/${projectId}/reviews`)
      .then(({data}) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      })
    }

    this.prepareForm = function(projectId){
      
    }

//revise this so that we're submitting an ANSWER not a 'review'
    // this.submitReview = function(answer) {
    //   return $http.post(`reviews/${reviewId}/answers`, answer)
    //   .then(({data}) => {
    //     return data
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // }
    //
    // this.deleteProject = function(id) {
    //   return $http.delete(`api/projects/${id}`)
    //   .then(({data}) => {
    //     console.log(data);
    //     // return data
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // }
    //
    // this.getQuestion = function(projectId) {
    //   return $http.get(`/api/projects/${projectId}/question`)
    //   .then(({data}) => {
    //     console.log(data);
    //     return data.question;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // }



  }


})();
