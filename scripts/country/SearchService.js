angular.module('phonertcdemo')
  .factory('SearchService', function ($interval, $timeout, signalingCountry) {
    
   
    var promiseTryCall;
    var promiseSearching;
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
            // promiseTryCall = $timeout(function(){ $scope.tryCall(); }, $scope.waitBeforePick);
    });



    service.start = function(data) {
      waitBeforePick = 10000 + Math.floor(Math.random() * 10000);
      promiseTryCall = $interval(function(){ service.tryCall(data); }, waitBeforePick);


      promiseSearching = $timeout(function() { 
          signalingCountry.emit('searching');
        }, 5000);
    };

    service.stop = function() {

      if(promiseTryCall) {
          $interval.cancel(promiseTryCall); 
      }

      if (promiseSearching) {
        $timeout.cancel(promiseSearching);
      }

    };


    return service;
  });