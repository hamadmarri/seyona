angular.module('phonertcdemo')
  .factory('ContactsServiceForInterests', function ($http, $interval, signalingInterests, InterestsService) {
    
    var onlineUsersCounter = 0;

    var commonInterests = [];

    var service = {
      onlineUsersCounter: onlineUsersCounter,
      currentName: '',
      commonInterests: commonInterests
    };


    service.setOnlineUsers = function (users, currentName) {
      this.onlineUsersCounter = users.length;
      this.currentName = currentName;
    };


    signalingInterests.on('online', function (interestsPerson) {
      service.onlineUsersCounter++;
    });

    signalingInterests.on('offline', function (interestsPerson) {
      service.onlineUsersCounter--;
    });


    service.setCommonInterests = function(interests) {
      service.commonInterests = [];
      var myInterests = InterestsService.myInterests;

      for (var i = 0; i < myInterests.length; i++) {
        for (var j = 0; j < interests.length; j++) {
          if (interests[j] == myInterests[i]) {
            service.commonInterests.push(interests[j]);
          }
        }
      }
    };


    return service;
  });