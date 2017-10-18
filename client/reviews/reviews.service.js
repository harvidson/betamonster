(function() {
  'use strict';

  angular.module('app')
    .service('reviewsService', service)

  service.$inject = ['$http', '$state']

  function service($http, $state) {
    const vm = this;
    vm.noReviews = true;

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

    this.getMyReviews = function(userId) {
      return $http.get(`api/users/${userId}/reviews`)
      .then(({data}) => {
        return data
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
          vm.noReviews = data.length === 0;
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
  }


})();
