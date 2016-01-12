angular.module('phonertcdemo')
  .factory('ContactsServiceForCountry', function ($http, $interval, signalingCountry, CountryService) {
    
    var onlineUsersCounter = 0;

    var callingCountryPerson = {};

    var service = {
      onlineUsersCounter: onlineUsersCounter,
      currentName: '',
      callingCountryPerson: callingCountryPerson
    };


    service.setOnlineUsers = function (users, currentName) {
      this.onlineUsersCounter = users.length;
      
      this.currentName = currentName;

      CountryService.clearCountryCounters();

      for (var i = 0; i < users.length; i++) {
        CountryService.incrementCountry(users[i].countryCode);
      };

    };


    signalingCountry.on('online', function (countryPerson) {
      service.onlineUsersCounter++;
       CountryService.incrementCountry(countryPerson.countryCode);
    });

    signalingCountry.on('offline', function (countryPerson) {
      service.onlineUsersCounter--;
      CountryService.decrementCountry(countryPerson.countryCode);
    });


    return service;
  });