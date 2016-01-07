'use strict';

angular.module('phonertcdemo', ['ionic', 
                                'ui.router', 
                                'config',
                                'btford.socket-io'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider



      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/app.html'
      })


      .state('app.testpage', {
        url: '/testpage',
        controller: 'TestPageCtrl',
        templateUrl: 'templates/testpage.html'
      })


      .state('app.takepicture', {
        url: '/takepicture',
        controller: 'TakePictureCtrl',
        templateUrl: 'templates/takepicture.html'
      })

      .state('app.positiveOrNegative', {
        url: '/positiveornegative',
        controller: 'PositiveOrNegativeCtrl',
        templateUrl: 'templates/positiveornegative.html'
      })

      .state('app.search', {
        url: '/search',
        controller: 'SearchCtrl',
        templateUrl: 'templates/search.html'
      })


      .state('app.login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'templates/login.html'
      })
      .state('app.contacts', {
        url: '/contacts',
        controller: 'ContactsCtrl',
        templateUrl: 'templates/contacts.html'
      })
      .state('app.call', {
        url: '/call/:contactName?isCalling',
        controller: 'CallCtrl',
        templateUrl: 'templates/call.html'
      });


    $urlRouterProvider.otherwise('app/login');
    // $urlRouterProvider.otherwise('app/takepicture');

  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if(window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .run(function ($state, signaling, MatchService) {
    signaling.on('messageReceived', function (name, message) {
      switch (message.type) {
        case 'call':
          if ($state.current.name === 'app.call') { return; }
          
          MatchService.setCrrentCallingId(message.matchId);
          MatchService.setCurrentMatchPercent(message.percentage);

          // alert(MatchService.getCrrentCallingId());

          $state.go('app.call', { isCalling: false, contactName: name });
          break;
      }
    });
  });