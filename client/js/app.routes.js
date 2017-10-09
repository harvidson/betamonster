(function() {
  'use strict';

  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true)

    $stateProvider
    //   .state({
    //     name: 'footer',
    //     abstract: true,
    //     component: 'footerFrame',
    //   })
      .state({
        name: 'home',
        url: '/',
        component: 'home',
      })
      .state({
        name: 'login',
        url: '/login',
        component: 'login',
      })
      .state({
        name: 'signup',
        url: '/signup',
        component: 'signup',
      })
      .state({
        name: 'devDashboard',
        url: '/developer',
        component: 'developer',
      })
      .state({
        name: 'testDashboard',
        url: '/tester',
        component: 'tester',
      })
      .state({
        name: 'projectForm',
        url: '/new-project',
        component: 'projectForm',
      })
      .state({
        name: 'reviewForm',
        url: '/new-review',
        component: 'reviewForm'
      })
  }

}());
