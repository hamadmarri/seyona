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
      waitBeforePick = 10000 + Math.floor(Math.random() * 10000);
      promiseTryCall = $interval(function(){ service.tryCall(data); }, waitBeforePick);


      promiseSearching = $timeout(function() { 
          signalingInterests.emit('searching');
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