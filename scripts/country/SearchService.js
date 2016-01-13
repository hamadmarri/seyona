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
      waitBeforePick = 10000 + randomTimeMoreThan10LessThan20();
      promiseTryCall = $interval(function(){ service.tryCall(data); }, waitBeforePick);


      promiseSearching = $timeout(function() { 
          signalingCountry.emit('searching');
        }, randomTimeMoreThan10LessThan20());
    };


    function randomTimeMoreThan10LessThan20() {
      return 10000 + Math.floor(Math.random() * 10000);
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