(function() {
  'use strict';

  angular.module('app')
    .service('reviewsService', service)

  service.$inject = ['$http', '$state', 'authService']

  function service($http, $state, authService) {
    const vm = this;

    this.getReviews = function(projectId) {
      return $http.get(`/api/projects/${projectId}/reviews`)
        .then(({
          data
        }) => {
          return data;
        })
        .catch((err) => {
          console.log(err);
        })
    }

    this.getWatsonData = function(projectId) {
      const watsonData = []

      return $http.get(`/api/projects/${projectId}/reviews`)
        .then(({
          data
        }) => {
          data.forEach((review) => {
            watsonData.push({
              reviewId: review.id,
              tones: review.watson_analysis.document_tone.tones
            })
          })
          return watsonData;
        })
        .catch((err) => {
          console.log(err);
        })
    }

    this.submitReview = function(data) {
      const projectId = data.projectId;

      return $http.post(`/api/projects/${projectId}/reviews`, data)
        .then(({
          data
        }) => {
          return data
        })
        .catch((err) => {
          console.log(err);
        })
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
