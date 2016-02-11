angular.module('phonertcdemo')
  .factory('ContactsService', function ($http, $interval, signaling) {
    
    var onlineUsersCounter = 0;


    var service = {
      onlineUsersCounter: onlineUsersCounter,
      currentName: ''
    };


    service.setOnlineUsers = function (usersCounter, currentName) {
      this.onlineUsersCounter = usersCounter;
      this.currentName = currentName;
    };


    signaling.on('online', function (name) {
      service.onlineUsersCounter++;
    });

    signaling.on('offline', function (name) {
      service.onlineUsersCounter--;
    });


    return service;
  });