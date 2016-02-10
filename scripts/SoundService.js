angular.module('phonertcdemo')
  .factory('SoundService', function ($ionicPlatform) {
    

    // var ringingSound = new Audio('audio/PhoneRinging.mp3');
    // var pickupSound = new Audio('audio/phone-pick-up.mp3');


    var ringingSoundSrc = "audio/PhoneRinging.mp3";
    var pickupSoundSrc = 'audio/phone-pick-up.mp3';


    if($ionicPlatform.is('android')){
        ringingSoundSrc = '/android_asset/www/' + ringingSoundSrc;
        pickupSoundSrc = '/android_asset/www/' + pickupSoundSrc;
    }

    var ringingSound = new Media(ringingSoundSrc);
    var pickupSound = new Media(pickupSoundSrc);


    var service = {
    };


    service.startPhoneRinging = function() {
        ringingSound.setVolume('1.0');
        ringingSound.play();
    };


    service.stopPhoneRinging = function() {
    	ringingSound.stop();
    };


    service.pickupPhone = function() {
    	pickupSound.setVolume('1.0');
        pickupSound.play();
    };

    return service;
  });