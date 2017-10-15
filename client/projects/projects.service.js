(function() {
  'use strict';

  angular.module('app')
    .service('projectsService', service)

  service.$inject = ['$http', '$state', 'authService']

  function service($http, $state, authService) {

    this.getProjects = function() {
      return $http.get('/api/projects')
        .then(({ data }) => {
          return data
        })
        .catch((err) => {
          console.log(err);
        })
    }

    this.getProjectById = function(projectId) {
      return $http.get(`/api/projects/${projectId}`)
        .then(({ data }) => {
          return data
        })
        .catch((err) => {
          console.log(err);
        })
    }

    this.getMyProjects = function(userId) {
      return $http.get(`/api/users/${userId}/projects`)
        .then(({ data }) => {
          return data
        })
        .catch((err) => {
          console.log(err);
        })
    }

    this.submitProject = function(project) {
      return $http.post('/api/projects', project)
      .then(({data}) => {
        return data
      })
      .catch((err) => {
        console.log(err);
      })
    }
    this.deleteProject = function(id) {
      return $http.delete(`api/projects/${id}`)
      .then(({data}) => {
        console.log(data);
        // return data
      })
      .catch((err) => {
        console.log(err);
      })
    }

    this.getQuestion = function(projectId) {
      return $http.get(`/api/projects/${projectId}/question`)
      .then(({data}) => {
        return data.question;
      })
      .catch((err) => {
        console.log(err);
      })
    }

    this.reSortPosts = function(sortSelected) {
      let selector = sortSelected.toLowerCase();
      if (selector === 'developer') {
        selector = 'developerLastName'
      };
      return selector;
    }


  }


})();
