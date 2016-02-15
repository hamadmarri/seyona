angular.module('phonertcdemo')
  .factory('InterestsSearchService', function ($interval, $timeout, signalingInterests) {
    
   
    // var promiseTryCall;
    // var promiseSearching;
    var waitBeforePick;

    var service = {
      promiseTryCall: null,
      promiseSearching: null,
      foundCallback: null,
      takeProfileCallback: null,
      readyToCallCallback: null
    };


    service.setCallbackFunctions = function(found, takeProfile, readyToCall) {
      service.foundCallback = found;
      service.takeProfileCallback = takeProfile;
      service.readyToCallCallback = readyToCall;
    };

    
    service.tryCall = function(data) {
      signalingInterests.emit('find', data);
    };


    signalingInterests.on('not_found', function (countryPerson) {
    });


    
    signalingInterests.on('found', function (interestsPerson) {
      service.foundCallback(interestsPerson);
    });


    signalingInterests.on('messageReceived', function (name, message) {
      switch (message.type) {
        case 'takeProfile':
          service.takeProfileCallback(name, message);
          break;
        case 'readyToCall':
          service.readyToCallCallback(name, message);
          break;
      }
    });

    service.start = function(data) {
      waitBeforePick = 1000 + randomTimeMoreThan10LessThan20();
      service.promiseTryCall = $interval(function(){ service.tryCall(data); }, waitBeforePick);


      service.promiseSearching = $timeout(function() { 
          signalingInterests.emit('searching');
        }, randomTimeMoreThan10LessThan20());
    };


    function randomTimeMoreThan10LessThan20() {
      return 5000 + Math.floor(Math.random() * 5000);
    };
    

    service.stop = function() {

      if(service.promiseTryCall) {
          $interval.cancel(service.promiseTryCall); 
      }

      if (service.promiseSearching) {
        $timeout.cancel(service.promiseSearching);
      }

    };


    return service;
  });