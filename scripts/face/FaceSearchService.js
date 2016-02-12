angular.module('phonertcdemo')
  .factory('FaceSearchService', function (signaling) {
    
   
    var service = {
      takeProfileCallback: null,
      readyToCallCallback: null
    };


    service.setCallbackFunctions = function(takeProfile, readyToCall) {
      service.takeProfileCallback = takeProfile;
      service.readyToCallCallback = readyToCall;
    };


    signaling.on('messageReceived', function (name, message) {
      switch (message.type) {
        case 'takeProfile':
          service.takeProfileCallback(name, message);
          break;
        case 'readyToCall':
          service.readyToCallCallback(name, message);
          break;
      }
    });


    return service;
  });