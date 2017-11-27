(function(){

    var app = angular.module('tracker', ['ionic', 'ngCordova',
    'tracker.services', 'tracker.rutas', 'tracker.mantes', 'AjustesCtrl', 'LoginCtrl', 
    'ManteCtrl', 'ManteDetallesCtrl', 'RutasCtrl', 'RutasDetallesCtrl'])

    app.run(function($ionicPlatform) {

        $ionicPlatform.ready(function() {

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
              StatusBar.styleDefault();
            }
          
        });

    })

    app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider)  {

      $ionicConfigProvider.tabs.position('bottom');

      $stateProvider.state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
      })

      $stateProvider.state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
      })

      $stateProvider.state('tab.rutas', {
          url: '/rutas',
          views: {
            'tab-rutas': {
              templateUrl: 'templates/tab-rutas.html',
              controller: 'RutasCtrl'
            }
          }
      })

      $stateProvider.state('tab.rutas-detalles', {
          url: '/rutas/:id',
          views: {
            'tab-rutas': {
              templateUrl: 'templates/rutas-detalles.html',
              controller: 'RutasDetallesCtrl'
            }
          }
      })

      $stateProvider.state('tab.mante', {
          url: '/mante',
          views: {
            'tab-mante': {
              templateUrl: 'templates/tab-mante.html',
              controller: 'ManteCtrl'
            }
          }
      })

      $stateProvider.state('tab.mante-detalles', {
          url: '/mante/:id',
          views: {
            'tab-mante': {
              templateUrl: 'templates/mante-detalles.html',
              controller: 'ManteDetallesCtrl'
            }
          }
      })

      $stateProvider.state('tab.ajustes', {
          url: '/ajustes',
          views: {
            'tab-ajustes': {
              templateUrl: 'templates/tab-ajustes.html',
              controller: 'AjustesCtrl'
            }
          }
      });

      $urlRouterProvider.otherwise('/login');

    });

}());