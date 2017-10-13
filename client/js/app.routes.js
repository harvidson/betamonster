(function() {
  'use strict';

  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        name: 'landing',
        component: 'landing',
        abstract: true
      })
    $stateProvider
      .state({
        name: 'devFrame',
        component: 'devFrame',
        abstract: true
      })
    $stateProvider
      .state({
        name: 'testFrame',
        component: 'testFrame',
        abstract: true
      })
      .state({
        name: 'home',
        url: '/',
        component: 'home',
        parent: 'landing'
      })
      .state({
        name: 'login',
        url: '/login',
        component: 'login',
        parent: 'landing'

      })
      .state({
        name: 'signup',
        url: '/signup',
        component: 'signup',
        parent: 'landing'

      })
      .state({
        name: 'devDashboard',
        url: '/developer',
        component: 'developer',
        parent: 'devFrame'

      })
      .state({
        name: 'testDashboard',
        url: '/tester',
        component: 'tester',
        parent: 'testFrame'

      })
      .state({
        name: 'projectForm',
        url: '/new-project',
        component: 'projectForm',
        parent: 'devFrame'

      })
      .state({
        name: 'newReview',
        url: '/projects/:id/review',
        component: 'newReview',
        parent: 'testFrame'

      })
      .state({
        name: 'myProjectDetail',
        url: 'developer/projects/:id',
        component: 'myProjectDetail',
        parent: 'devFrame'

      })
  }

}());
