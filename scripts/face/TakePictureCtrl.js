angular.module('phonertcdemo')

.controller('TakePictureCtrl', function($scope, $http, $state, $ionicPopup, $ionicPopover, $timeout,
   signaling, ContactsService, MatchService, ENV, FullScreenImageService, $ionicLoading) {


  // .fromTemplate() method
  var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Processing</h1> </ion-header-bar> <ion-content style="padding: 25px;"> {{showStatusTitle + showStatusTitleDots}} </ion-content></ion-popover-view>';

  // $scope.popover = $ionicPopover.fromTemplate(template, {
  //   scope: $scope
  // });

  $scope.popover = $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.status = 0;
  $scope.showStatusTitle = "";
  $scope.showStatusTitleDots = "";
  $scope.loginName = "a" + Math.floor(Math.random() * 1000000000);


  $scope.posOrNegList = [
      { text: "Alike", value: "pos" },
      { text: "Unalike", value: "neg" }
    ];

  $scope.posOrNeg = {
    data: 'pos'
  };


  $scope.goBack = function() {
    $state.go('app.home');
  };

  $scope.sendPhoto = function($event) {

    $scope.status = 2; // photo synchronizing
    $scope.showStatus($event);


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

   $http.post(ENV.apiEndpoint + '/people', data, config)
   .then(function(response) { // SUCCESS

        $scope.status = 3; // face detecting

         // alert(response.status + " " + response.data);

          // login
          signaling.emit('login', $scope.loginName);

        }, function(response) { // ERROR
         // alert(response.status + " " + response.data);
         $scope.status = 5; // error

         // response.status + " "
         $scope.showStatusTitle = "ERROR: " + response.status + " " + response.data;
         $scope.showStatusTitleDots = "";
       });
 };


 signaling.on('login_error', function (message) {

  scope.closePopover();

  var alertPopup = $ionicPopup.alert({
    title: 'Error',
    template: message
  });
});

 signaling.on('login_successful', function (users) {
  // ContactsService.setOnlineUsers(users, $scope.loginName);
  ContactsService.setOnlineUsers(users.length, $scope.loginName);

  if ($scope.posOrNeg.data == "pos") {
    // alert(true);
    MatchService.setNegative(false);
  } else {
    // alert(false);
    MatchService.setNegative(true);
  }
  
  
  $timeout(function(){$state.go('app.search');}, 2000);
  // $timeout(function(){$state.go('app.positiveOrNegative');}, 2000);
});


$scope.openPopover = function($event) {
     $scope.popover.show($event);
   };
$scope.closePopover = function() {
     $scope.popover.hide();
     $scope.status = 4; // canceled
   };

   $scope.$on('$destroy', function() {
       $scope.popover.remove();
     });

$scope.showStatus = function($event) {

  $scope.popover.show($event);

  $scope.processingEffect();
};

$scope.processingEffect = function() {

  if ($scope.status == 2) {
    $scope.showStatusTitle = "Synchronizing photo";

  } else if ($scope.status == 3) {
    $scope.showStatusTitle = "Face detecting";

  } else if ($scope.status == 5) { // error
    // $scope.showStatusTitle = "Face detecting";
    $scope.showStatusTitleDots = "";
    $scope.$apply();
    return;
  } 

  if ($scope.showStatusTitleDots.length % 5 == 0) {
    $scope.showStatusTitleDots = "";
  }

  $scope.showStatusTitleDots += ".";
  $scope.$apply();

  $timeout(function() {

    if ($scope.status == 2 || $scope.status == 3) {
      $scope.processingEffect();
    }

    //  else {
    //   $("#processing").text("");
    //   gotoSearch();
    // }

  }, 150);
};


 $scope.getPhoto = function() {

  // $scope.status = 1;

  $ionicLoading.show();


  setTimeout(function() {
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
    
  }, 500);





  function onSuccess(imageData) {
    $ionicLoading.hide();

    var image = $("#photo")[0];
    image.src = "data:image/jpeg;base64," + imageData;

    $scope.imageSrc = image.src;
    $scope.status = 1;
    $scope.$apply();
  }

  function onFail(message) {
    $ionicLoading.hide();
    // $scope.status = 0;
    // $scope.$apply();
    // alert('Failed because: ' + message);
  }

 
};



$scope.openModal = function() {
  FullScreenImageService.customTemp = '<div class="footerButton row">' +
  '<div class="col-25"><button class="button' +
      ' button-icon icon ion-edit" ng-click="getPhoto()"></button></div>' +
      '<div class="col-25 col-offset-50"><button style="float: right;" class="button button-icon icon ion-close-circled"></button></div></div>';
  FullScreenImageService.openModal($scope, $scope.imageSrc);
};

$scope.closeModal = function() {
  FullScreenImageService.closeModal();
};

//Cleanup the modal when we're done with it!
$scope.$on('$destroy', function() {
  FullScreenImageService.removeModal();
});




})
;