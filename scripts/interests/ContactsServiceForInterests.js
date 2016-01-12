angular.module('phonertcdemo')
  .factory('ContactsServiceForInterests', function ($http, $interval, signaling, CountryService) {
    
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


    signaling.on('online', function (countryPerson) {
      service.onlineUsersCounter++;
       CountryService.incrementCountry(countryPerson.countryCode);
    });

    signaling.on('offline', function (countryPerson) {
      service.onlineUsersCounter--;
      CountryService.decrementCountry(countryPerson.countryCode);
    });


    return service;
  });