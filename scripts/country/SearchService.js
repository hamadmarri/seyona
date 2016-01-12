angular.module('phonertcdemo')
  .factory('SearchService', function ($interval, $timeout, signalingCountry) {
    
   
    var promise;
    var waitBeforePick;

    var service = {
      // onlineUsersCounter: onlineUsersCounter,
      // currentName: ''
    };


    
    service.tryCall = function(data) {
      // alert('tryCall ' + waitBeforePick);

      signalingCountry.emit('find', data);
    };


    signalingCountry.on('not_found', function (countryPerson) {
            // promise = $timeout(function(){ $scope.tryCall(); }, $scope.waitBeforePick);
    });



    service.start = function(data) {
      waitBeforePick = 10000 + Math.floor(Math.random() * 10000);
      promise = $interval(function(){ service.tryCall(data); }, waitBeforePick);


      $timeout(function() { 
          signalingCountry.emit('searching');
        }, 5000);
    };

    service.stop = function() {
      // alert('stop');

      if(promise) {
          $interval.cancel(promise); 
          // alert('interval.cancel');
      }

    };


    return service;
  });