angular.module('phonertcdemo')

.controller('SearchingInterestsCtrl', function ($scope, $state, $timeout, $interval, 
    signalingInterests, ContactsServiceForInterests, InterestsService, InterestsSearchService) {


  var tipsDelay = 21000;
  $scope.dots = ".";
  $scope.searchingMargin = ((window.innerWidth / 2) - 130) + "px";

  $scope.online = function() { 
    return ContactsServiceForInterests.onlineUsersCounter; 
  };


  $scope.img1 = "0404";
  $scope.img2 = "0406";
  $scope.img3 = "0407";
  $scope.img4 = "0408";


  function changeTip() {
    var r = Math.floor(Math.random() * 10);  // * 100) % 11;
    
    switch (r) {
    case 0:
      $scope.tip = "If you are waiting for so long time, it is because most of online users are busy with other calls. Please be patient.";
      break;
    case 1:
      $scope.tip = "If you are waiting for so long time, it is because most of online users are busy with other calls. Please be patient.";
      break;
    case 2:
      $scope.tip = "If you are waiting for so long time, it is because most of online users are busy with other calls. Please be patient.";
      break;
    case 3:
      $scope.tip = "Be the first who says Hi!";
      break;
    case 4:
      $scope.tip = "When you recieve calls from others you can either answer or ignore.";
      break;
    case 5:
      $scope.tip = "Don't forget to rate me in Google Play/App Store :D";
      break;
    case 6:
      $scope.tip = "Through HELP button, you can contact us and write your suggestions.";
      break;
    case 7:
      $scope.tip = "SMILE :)";
      break;
    case 8:
      $scope.tip = "End Call button will end your call and connect you with another user.";
      break;
    case 9:
      $scope.tip = "Share Seyona with your friends. The more online people, the more chance to find your twin.";
      break;
    }
  }


  function animateSearchingDots() {
    if ($scope.dots.length % 5 == 0) {
      $scope.dots = "";
    }

    $scope.dots += ".";
    // $scope.$apply();
  }


  $scope.smileysLuck = function() {
    runLuckFor(21);
  };


  function runLuckFor(manyTimes) {

    if (manyTimes == 0) {
      return;
    }

    manyTimes--;

    var r1 = (Math.floor(Math.random() * 10000) % 1625) + 1;
    var r2 = (Math.floor(Math.random() * 10000) % 1625) + 1;
    var r3 = (Math.floor(Math.random() * 10000) % 1625) + 1;
    var r4 = (Math.floor(Math.random() * 10000) % 1625) + 1;

    $scope.img1 = pad(r1, 4);
    $scope.img2 = pad(r2, 4);
    $scope.img3 = pad(r3, 4);
    $scope.img4 = pad(r4, 4);

    $scope.$apply();

    $timeout(function(){runLuckFor(manyTimes);}, 80);
  }


  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }


  $scope.back = function() {
    InterestsSearchService.stop();
    signalingInterests.emit('busy');
    $state.go('app.pickinterests');
  };



  signalingInterests.on('found', function (interestsPerson) {
      ContactsServiceForInterests.setCommonInterests(interestsPerson.interests);

      InterestsSearchService.stop();

      $state.go('app.interestscall', { isCalling: true, contactName: interestsPerson.name }); 
  });



  $scope.init = function() {
    changeTip();
    $interval(changeTip, tipsDelay);
    $interval(animateSearchingDots, 400);

    InterestsSearchService.start({ interests: InterestsService.myInterests });
  };

  
});