angular.module('phonertcdemo')

  .controller('PickInterestsCtrl', function ($scope, $state, $timeout, InterestsService,
   ContactsServiceForInterests, $ionicPopup, signalingInterests) {
 
    $scope.interest = '';
    $scope.myInterests = [];
    $scope.loginName = "a" + Math.floor(Math.random() * 1000000000);
    var deletePromis;
    $scope.showSearch = false;


    $scope.categoryArray = [false, false, false, false, false];


    $scope.toast = function(s) {
      $('.toast').stop();
      $('.toast').hide();
      $('.toast').html(s);
      $('.toast').fadeIn(400).delay(1000).fadeOut(400);
    };

    $scope.showAdded = function(b, s) {


      if (!$scope.categoryArray[b]) {
        $scope.toast(s + " is added");
      } else {
        $scope.toast(s + " is removed");
      }


      $scope.categoryArray[b] = !$scope.categoryArray[b];


      
      $scope.showSearch = false;

      for (var i = 0; i < $scope.categoryArray.length; i++) {
        if ($scope.categoryArray[i]) {
          $scope.showSearch = true;
          return;      
        }
      }

      
    };
    


    $scope.interestsPlaceholder = function() {
      if ($scope.myInterests.length < 5) {
        return "Or type your own...";
      } else {
        return "maximum is 5!";
      }
    }; 



    function isInArray(value) {
      for (var i = 0; i < $scope.myInterests.length; i++) {
        if ($scope.myInterests[i].value === value) {
          return true;
        }
      }

      return false;
    }

    $scope.add = function(i) {
      i = i.trim();

      if (isInArray(i)) {
        return;
      }

      if (i != '') {
        $scope.myInterests.push( { value: i, toDelete: false } );
        $scope.toast(i + " is added");
      }

    };


    $scope.toDelete = function(i) {

      if (i.isDelete) {

        if (deletePromis) {
          $timeout.cancel(deletePromis);
        }

        $scope.delete(i);
        return;
      }

      i.isDelete = !i.isDelete;

      deletePromis = $timeout(function() {
        i.isDelete = false;
      }, 3000);

    };


    $scope.delete = function(item) {
      var index = -1;

      for (var i = 0; i < $scope.myInterests.length; i++) {
        if ($scope.myInterests[i].value == item.value) {
          index = i;
          break;
        }     
      }


      if (index > -1) {
          $scope.myInterests.splice(index, 1);
          $scope.toast(item.value + " is removed");
      }
    };


    $scope.search = function() {
      var array = [];

      for (var i = 0; i < $scope.categoryArray.length; i++) {
        if ($scope.categoryArray[i]) {
          if (i == 0) {
            array.push('games');  
          } else if (i == 1) {
            array.push('Love');  
          } else if (i == 2) {
            array.push('Music');  
          } else if (i == 3) {
            array.push('Movies');  
          } else if (i == 4) {
            array.push('Travel');  
          }
        }
      }

      for (var i = 0; i < $scope.myInterests.length; i++) {
        array.push($scope.myInterests[i].value);
      }


      whitelistize(array);

      convertToLowerCase(array);

      InterestsService.myInterests = array;

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
        interests: InterestsService.myInterests,
        status: 1, // busy
        callsCount: 0
      };
      
      signalingInterests.emit('login', interestsPerson);
    };


    signalingInterests.on('login_error', function (message) {

      if (message == 'You are already connected.' 
              || message == 'This name already exists.') {

        
        setTimeout(function() { signalingInterests.emit('logout'); }, 1000);
        setTimeout(function() { $scope.login(); }, 3000);
        return;
      }

      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: message
      });
    });


    signalingInterests.on('login_successful', function (users) {
      ContactsServiceForInterests.setOnlineUsers(users, $scope.loginName);

      $state.go('app.searchinginterests');
    });

    


    $scope.init = function() {
      // signalingInterests.emit('busy');

      signalingInterests.emit('logout');
    };


    $scope.goBack = function() {
      $state.go('app.home');
    };

  });