angular.module('phonertcdemo')

.controller('SearchingCountryCtrl', function ($scope, $state, $timeout, $interval, 
    signalingCountry, ContactsServiceForCountry, CountryService, SearchService, 
    ProfileService, $ionicPopup, BlacklistService, SoundService, FullScreenImageService) {


  var tipsDelay = 21000;
  $scope.dots = ".";
  $scope.searchingMargin = ((window.innerWidth / 2) - 130) + "px";

  $scope.otherCountry = CountryService.find(CountryService.getCallingCountryCode());

   // var promise;

  $scope.img1 = "0404";
  $scope.img2 = "0406";
  $scope.img3 = "0407";
  $scope.img4 = "0408";



  $scope.myFlag = function() {
    return CountryService.getMyCountry().flag;
  };

  $scope.callingCountryFlag = function() {
    return $scope.otherCountry.flag;
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
      $scope.tip = "Share Seyona with your friends.";
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
    SearchService.stop();
    $state.go('app.pickothercountry');
  };



  $scope.found = function(countryPerson) {
  
    if (!BlacklistService.isInBlacklist(countryPerson.name)) {
      ContactsServiceForCountry.callingCountryPerson = CountryService.find(countryPerson.countryCode);

      SearchService.stop();

      signalingCountry.emit('busy');

      signalingCountry.emit('sendMessage', countryPerson.name, { type: 'shareProfile', initializor: true });  
    }

  };



  $scope.messageReceived_TakeProfile = function(name, message) {

    SoundService.startPhoneRinging();

    var profile = message.profile;
    var template = "";


    signalingCountry.emit('busy');

    if (profile.image == "") {
      profile.image = "logo.svg";
    }

    $scope.profileImage = profile.image;

    template += '<img id="myphoto" style="height: auto;' +
          'width: auto; max-width: 100px; max-height: 100px;" src="' + profile.image + 
          '" ng-click="openModal()">';

    template += "<br>Name: " + profile.username;

    if (profile.countryCode != undefined) {
      var country = CountryService.find(profile.countryCode);
      template += '<br> <img ng-src="emoji/' + country.flag + '.svg">';
      template += '<br>' + country.name;
    }

    if (profile.age != undefined) {
      template += "<br>Age: " + profile.age;
    }
    
    if (profile.gender != undefined) {
      template += "<br>Gender: " + profile.gender;
    }

    var confirmPopup = $ionicPopup.confirm({
      // title: profile.username,
      template: template,
      cancelText: 'Nevermind',
      okText: 'Call',
      scope: $scope
    });

    // decide either call or search again
    confirmPopup.then(function(res) {
      var isReady = false;


      SoundService.stopPhoneRinging();


      if(res) {
        isReady = true;
        
        SoundService.pickupPhone();
      } else {

        // add to blacklist
        BlacklistService.add(name);

        var query = {
          countryCode: CountryService.getCallingCountryCode(),
          blackList: BlacklistService.blackList
        };

        SearchService.start(query);
      }


      var newMessage = {
        type: 'readyToCall',
        ready: isReady,
        initializor: !message.initializor
      };

      if (isReady) {
        signalingCountry.emit('sendMessage', name, newMessage);  
      } else if (message.initializor == true) {
        signalingCountry.emit('sendMessage', name, newMessage);  
      }
      

    });
  };


  $scope.messageReceived_ReadyToCall = function(name, message) {
    if (message.ready == true) {
      
      // if the other person is the caller
      if (message.initializor == true) {

        SearchService.stop();
        signalingCountry.emit('busy');
        signalingCountry.emit('sendMessage', name,{type:'shareProfile',initializor:false });

      } else {
        $state.go('app.countrycall', { isCalling: true, contactName: name });  
      }
    } else {

      // add to blacklist
      BlacklistService.add(name);

      var alertPopup = $ionicPopup.alert({
           title: 'Sorry!',
           template: 'The other person ignored the call :('
         });

         alertPopup.then(function(res) {
            var query = {
              countryCode: CountryService.getCallingCountryCode(),
              blackList: BlacklistService.blackList
            };

            SearchService.start(query);
         });
    }
  };


  $scope.openModal = function() {
    FullScreenImageService.openModal($scope, $scope.profileImage);
  };

  $scope.closeModal = function() {
    FullScreenImageService.closeModal();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    FullScreenImageService.removeModal();
  });


  $scope.init = function() {
    changeTip();
    $interval(changeTip, tipsDelay);
    $interval(animateSearchingDots, 400);

    SearchService.setCallbackFunctions($scope.found, 
            $scope.messageReceived_TakeProfile,
            $scope.messageReceived_ReadyToCall);

    var query = {
      countryCode: CountryService.getCallingCountryCode(),
      blackList: BlacklistService.blackList
    };

    SearchService.start(query);
  };

  





});