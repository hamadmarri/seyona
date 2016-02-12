angular.module('phonertcdemo')
  .factory('SearchService', function ($interval, $timeout, signalingCountry) {
    
   
    var promiseTryCall;
    var promiseSearching;
    var waitBeforePick;

    var service = {
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
      signalingCountry.emit('find', data);
    };


    signalingCountry.on('not_found', function (countryPerson) {
    });


    signalingCountry.on('found', function (countryPerson) {
      service.foundCallback(countryPerson);
    });


    signalingCountry.on('messageReceived', function (name, message) {
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
      promiseTryCall = $interval(function(){ service.tryCall(data); }, waitBeforePick);


      promiseSearching = $timeout(function() { 
          signalingCountry.emit('searching');
        }, randomTimeMoreThan10LessThan20());
    };


    function randomTimeMoreThan10LessThan20() {
      return 5000 + Math.floor(Math.random() * 5000);
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