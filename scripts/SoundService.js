angular.module('phonertcdemo')
  .factory('SoundService', function () {
    

    var ringingSound = new Audio('audio/PhoneRinging.mp3');
    var pickupSound = new Audio('audio/phone-pick-up.mp3');

    var service = {
    };


    service.startPhoneRinging = function() {
    	ringingSound.play();
    };


    service.stopPhoneRinging = function() {
    	ringingSound.pause();
    	ringingSound.currentTime = 0;
    };


    service.pickupPhone = function() {
    	// service.stopPhoneRinging();
    	pickupSound.play();
    };

    return service;
  });