angular.module('phonertcdemo')
  .factory('InterestsSearchService', function ($interval, $timeout, signalingInterests) {
    
   
    var promiseTryCall;
    var promiseSearching;
    var waitBeforePick;

    var service = {
    };


    
    service.tryCall = function(data) {
      signalingInterests.emit('find', data);
    };


    signalingInterests.on('not_found', function (countryPerson) {
    });



    service.start = function(data) {
      waitBeforePick = 10000 + randomTimeMoreThan10LessThan20();
      promiseTryCall = $interval(function(){ service.tryCall(data); }, waitBeforePick);


      promiseSearching = $timeout(function() { 
          signalingInterests.emit('searching');
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