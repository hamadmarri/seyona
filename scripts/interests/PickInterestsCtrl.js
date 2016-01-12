angular.module('phonertcdemo')

  .controller('PickInterestsCtrl', function ($scope, $state, InterestsService,
   ContactsServiceForInterests, $ionicPopup, signaling) {
 
    $scope.interest = '';
    $scope.myInterests = [];
    $scope.loginName = "a" + Math.floor(Math.random() * 1000000000);
    

    $scope.interestsPlaceholder = function() {
      if ($scope.myInterests.length < 5) {
        return "Type your interests here...";
      } else {
        return "maximum is 5!";
      }
    }; 

    $scope.add = function(i) {
      i = i.trim();

      if (i != '') {
        $scope.myInterests.push(i);
      }

    };


    $scope.delete = function(i) {
      var index = $scope.myInterests.indexOf(i);

      if (index > -1) {
          $scope.myInterests.splice(index, 1);
      }
    };


    $scope.search = function() {

      whitelistize($scope.myInterests);

      convertToLowerCase($scope.myInterests);

      InterestsService.myInterests = $scope.myInterests;

      $scope.login();
    };


    function whitelistize(array) {
      var validChars = "abcdefghijklmnopqrstuvwxiz";
      validChars += validChars.toUpperCase();
      validChars += "0123456789";

      for (var i = 0; i < array.length; i++) {
        var regex = new RegExp('[^' + validChars + ']', 'g');

        array[i] = array[i].replace(regex, '');

        if (array[i] == '') {
          array.splice(i, 1);
        }
      }

    }

    function convertToLowerCase(array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = array[i].toLowerCase();
      }
    }

    $scope.login = function () {
      var interestsPerson = {
        name: $scope.loginName,
        interests: $scope.myInterests,
        status: 1, // busy
        callsCount: 0
      };

      signaling.emit('login', interestsPerson);
    };


    signaling.on('login_error', function (message) {

      if (message == 'You are already connected.' 
              || message == 'This name already exists.') {

        
        setTimeout(function() { signaling.emit('logout'); }, 1000);
        setTimeout(function() { $scope.login(); }, 3000);
        return;
      }

      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: message
      });
    });


    signaling.on('login_successful', function (users) {
      ContactsServiceForInterests.setOnlineUsers(users, $scope.loginName);

      $state.go('app.searchinginterests');
    });

    

  });