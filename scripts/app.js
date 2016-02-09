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



      /********************** COUNTRY  ***************************/
      .state('app.pickmycountry', {
        url: '/pickmycountry',
        controller: 'PickMyCountryCtrl',
        templateUrl: 'templates/country/pickmycountry.html'
      })


      .state('app.pickothercountry', {
        url: '/pickothercountry',
        controller: 'PickOtherCountryCtrl',
        templateUrl: 'templates/country/pickothercountry.html'
      })

      .state('app.welcomecountry', {
        url: '/welcomecountry',
        controller: 'WelcomeCountryCtrl',
        templateUrl: 'templates/country/welcomecountry.html'
      })

      .state('app.searchingcountry', {
        url: '/searchingcountry',
        controller: 'SearchingCountryCtrl',
        templateUrl: 'templates/country/searchingcountry.html'
      })


      .state('app.countrycall', {
        url: '/countrycall/:contactName?isCalling',
        controller: 'CountryCallCtrl',
        templateUrl: 'templates/country/countrycall.html'
      })



      /********************** INTERESTS  ***************************/
      .state('app.pickinterests', {
        url: '/pickinterests',
        controller: 'PickInterestsCtrl',
        templateUrl: 'templates/interests/pickinterests.html'
      })


      .state('app.searchinginterests', {
        url: '/searchinginterests',
        controller: 'SearchingInterestsCtrl',
        templateUrl: 'templates/interests/searchinginterests.html'
      })


      .state('app.interestscall', {
        url: '/interestscall/:contactName?isCalling',
        controller: 'InterestsCallCtrl',
        templateUrl: 'templates/interests/interestscall.html'
      })


      .state('app.home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: 'templates/home.html'
      })

      .state('app.help', {
        url: '/help',
        controller: 'PickInterestsCtrl',
        templateUrl: 'templates/help.html'
      })


      /********************** PROFILE  ***************************/
      .state('app.signup', {
        url: '/signup',
        controller: 'SignupCtrl',
        templateUrl: 'templates/profile/signup.html'
      })

      .state('app.showprofile', {
        url: '/showprofile',
        controller: 'ShowProfileCtrl',
        templateUrl: 'templates/profile/showprofile.html'
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


    // $urlRouterProvider.otherwise('app/showprofile');
    $urlRouterProvider.otherwise('app/home');

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

  
  .run(function($state, ProfileService) {

    ProfileService.load();
    loading();

    function loading() {
      setTimeout(function() { 
        if (ProfileService.status != "done") {
          loading();
        } else {
          // alert(ProfileService.profile.username);

          if (ProfileService.profile.username == "") {
            $state.go('app.signup');
          } else {
            $state.go('app.showprofile');
          }
        }
        
       }, 350);
    }

  })

  .run(function ($state, signaling, signalingCountry, signalingInterests,
             MatchService, ContactsServiceForCountry, SearchService, 
             InterestsSearchService, ContactsServiceForInterests) {

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



    signalingCountry.on('messageReceived', function (name, message) {

      switch (message.type) {
        case 'countrycall':
          
          if ($state.current.name === 'app.countrycall') { return; }

          ContactsServiceForCountry.callingCountryPerson = message.callingCountryPerson;
          SearchService.stop();
          $state.go('app.countrycall', { isCalling: false, contactName: name });
          break;
      }
    });


    signalingInterests.on('messageReceived', function (name, message) {

      switch (message.type) {
        case 'interestscall':
          
          if ($state.current.name === 'app.interestscall') { return; }

          ContactsServiceForInterests.commonInterests = message.commonInterests;
          InterestsSearchService.stop();
          $state.go('app.interestscall', { isCalling: false, contactName: name });
          break;
      }
    });
      

  });