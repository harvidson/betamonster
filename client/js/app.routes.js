(function() {
  'use strict';

  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        name: 'framing',
        component: 'framing',
        abstract: true
      })
      .state({
        name: 'home',
        url: '/',
        component: 'home',
        parent: 'framing'
      })
      .state({
        name: 'login',
        url: '/login',
        component: 'login',
        // parent: 'framing'

      })
      .state({
        name: 'signup',
        url: '/signup',
        component: 'signup',
        parent: 'framing'

      })
      .state({
        name: 'devDashboard',
        url: '/developer',
        component: 'developer',
        // parent: 'framing'

      })
      .state({
        name: 'testDashboard',
        url: '/tester',
        component: 'tester',
        // parent: 'framing'

      })
      .state({
        name: 'projectForm',
        url: '/new-project',
        component: 'projectForm',
        // parent: 'framing'

      })
      .state({
        name: 'reviewForm',
        url: '/new-review',
        component: 'reviewForm',
        // parent: 'framing'

      })
  }

}());
