angular.module('phonertcdemo')
  .factory('ContactsService', function ($http, $interval, signaling) {
    
    var onlineUsersCounter = 0;


    var service = {
      onlineUsersCounter: onlineUsersCounter
    };


    service.setOnlineUsers = function (usersCounter) {
      this.onlineUsersCounter = usersCounter;
    };


    signaling.on('online', function (name) {
      service.onlineUsersCounter++;
    });

    signaling.on('offline', function (name) {
      service.onlineUsersCounter--;
    });


    return service;
  });