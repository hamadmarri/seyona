angular.module('phonertcdemo')

.controller('TackPictureCtrl', function($scope, $http, $state, signaling, ContactsService) {

  $scope.domain = "http://192.168.100.6:8080/EvitagenB";
  $scope.loginName = "webForNow";

  $scope.sendPhoto = function() {
  	var person;
  	person = {
  		webRtcId : $scope.loginName,
      image : $("#photo")[0].src //getBase64Image($("#photo")[0])
    };

    var data = JSON.stringify(person);
    var config = {headers: {
     'Content-Type': "application/json;charset=UTF-8"
   }};

   // alert(data);


   $http.post($scope.domain + '/people', data, config)
   .then(function(response) {
          // $scope.status = response.status;
          // $scope.data = response.data;
          alert(response.status + " " + response.data);

          // login
          signaling.emit('login', $scope.loginName);

        }, function(response) {
         alert(response.status + " " + response.data);
       });
 };


 signaling.on('login_error', function (message) {
  var alertPopup = $ionicPopup.alert({
    title: 'Error',
    template: message
  });
});

 signaling.on('login_successful', function (users) {
  ContactsService.setOnlineUsers(users, $scope.loginName);
  $state.go('app.contacts');
});



 $scope.getPhoto = function() {

  navigator.camera.getPicture(onSuccess, onFail, 
  {
    destinationType: Camera.DestinationType.DATA_URL,
    // encodingType: Camera.EncodingType.PNG,
    // destinationType: destinationType.FILE_URI,
    quality: 70,
    // targetWidth: 320,
    // targetHeight: 320,
    // targetWidth: 720,
    // targetHeight: 720,
    // popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false,

    targetWidth:320,
    correctOrientation: true,
    encodingType: Camera.EncodingType.JPEG,

    cameraDirection: 1

    // sourceType: Camera.PictureSourceType.PHOTOLIBRARY
  });


  function onSuccess(imageData) {
    var image = $("#photo")[0];
    image.src = "data:image/jpeg;base64," + imageData;
  }

  function onFail(message) {
    alert('Failed because: ' + message);
  }


};


})
;