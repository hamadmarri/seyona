angular.module('phonertcdemo')
  .factory('ContactsServiceForCountry', function ($http, $interval, signaling, CountryService) {
    
    var onlineUsersCounter = 0;


    var service = {
      onlineUsersCounter: onlineUsersCounter,
      currentName: ''
    };


    service.setOnlineUsers = function (users, currentName, myCountry) {
      this.onlineUsersCounter = users.length;
      
      console.log(users);

      this.currentName = currentName;

      // var countries = CountryService.getCountries();

      for (var i = 0; i < users.length; i++) {
        CountryService.incrementCountry(users[i].otherCountry);
      };


      // decrement because it's already added
      // CountryService.decrementCountry(otherCountry);


      // alert("service.setOnlineUsers: " + myCountry);
      console.log("service.setOnlineUsers: " + myCountry);
    };


    signaling.on('online', function (loggedInUser) {
      service.onlineUsersCounter++;

       CountryService.incrementCountry(loggedInUser.otherCountry);

      // alert("online: " + loggedInUser.name);
    });

    signaling.on('offline', function (loggedInUser) {
      service.onlineUsersCounter--;

      CountryService.decrementCountry(loggedInUser.otherCountry);
      // alert("offline: " + loggedInUser.name);
    });


    return service;
  });