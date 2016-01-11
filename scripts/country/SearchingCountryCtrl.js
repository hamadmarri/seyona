angular.module('phonertcdemo')

.controller('SearchingCountryCtrl', function ($scope, $state, $timeout, $interval, 
    signaling, ContactsServiceForCountry, CountryService) {


  $scope.waitBeforePick = 2000; //10000;
  var tipsDelay = 21000;
  $scope.dots = "";
  $scope.searchingMargin = ((window.innerWidth / 2) - 80) + "px";

  $scope.img1 = "0404";
  $scope.img2 = "0406";
  $scope.img3 = "0407";
  $scope.img4 = "0408";



  $scope.callingCountryFlag = function() {
    return CountryService.find(CountryService.getCallingCountryCode()).flag;
  };

  $scope.onlineUsersCount = function() {
    return  ContactsServiceForCountry.onlineUsersCounter;
  };
  

  function changeTip() {
    var r = Math.floor(Math.random() * 10);  // * 100) % 11;
    
    switch (r) {
    case 0:
      $scope.tip = "When you got calls from deferent countries that means they have chosen your country. You can answer or ignore.";
      break;
    case 1:
      $scope.tip = "When you got calls from deferent countries that means they have chosen your country. You can answer or ignore.";
      break;
    case 2:
      $scope.tip = "If you are waiting for so long time, it is because most of online users are busy with other calls. Please be patient.";
      break;
    case 3:
      $scope.tip = "Be the first who says Hi!";
      break;
    case 4:
      $scope.tip = "When you got calls from deferent countries that means they have chosen your country. You can answer or ignore.";
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
    if ($scope.dots.length % 3 == 0) {
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
    $state.go('app.takepicture');
  };



  $scope.tryCall = function() {
    signaling.emit('find', {countryCode: CountryService.getCallingCountryCode()});
  };


  signaling.on('found', function (countryPerson) {
      ContactsServiceForCountry.callingCountryPerson = countryPerson;
      $state.go('app.call', { isCalling: true, contactName: countryPerson.name }); 
  });


  signaling.on('not_found', function (countryPerson) {
          $timeout(function(){ $scope.tryCall(); }, $scope.waitBeforePick);
  });


  changeTip();
  $interval(changeTip, tipsDelay);
  $interval(animateSearchingDots, 400);

  $timeout(function(){ $scope.tryCall(); }, $scope.waitBeforePick);





  $scope.login = function() {
    
    CountryService.setCallingCountryCode('AF');

    var countryPerson = {
      name: 'test',
      countryCode: 'SA',
      status: 'searching',
      callsCount: 0
    };

    signaling.emit('login', countryPerson);
  };


  signaling.on('login_error', function (message) {
  });


  signaling.on('login_successful', function (users) {
    ContactsServiceForCountry.setOnlineUsers(users, 'test');
  });


  $scope.login();

});