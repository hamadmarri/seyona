angular.module('phonertcdemo')

  .controller('TestPageCtrl', function ($scope, $interval, $timeout, signaling, CountryService, ContactsServiceForCountry) {

  	// $scope.width = screen.width; //window.innerWidth;
  	// $scope.height = screen.height; //window.innerHeight;


 
    $scope.countries = CountryService.getCountries();
    $scope.limit = 21;

    $scope.loginName = "a" + Math.floor(Math.random() * 1000000000);
    var randomNumberForCountry = Math.floor((Math.random() * 1000) % $scope.countries.length);


    // alert(CountryService.getMyCountry().code);
    
    CountryService.setMyCountry($scope.countries[randomNumberForCountry]);

    // alert(CountryService.getMyCountry().code);

    $scope.myCountry = CountryService.getMyCountry();



    $scope.login = function () {
      signaling.emit('login', { name: $scope.loginName, otherCountry: $scope.myCountry } );
    };


    signaling.on('login_error', function (message) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error',
        template: message
      });
    });


    signaling.on('login_successful', function (users) {
      ContactsServiceForCountry.setOnlineUsers(users, $scope.loginName, $scope.myCountry);
      $state.go('app.contacts');
    });


    $scope.login();


    $scope.loadMore = function() {
      // alert($scope.limit);

      $scope.limit += 21;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    };


    $scope.pickCountry = function(c) {
      // var t = CountryService.find(c.code);
      // alert(t.name + " " + t.code + " " + t.flag + " " + t.online);
      CountryService.incrementCountry(c);
    };





    $scope.n = 100;
    $scope.open = function() {

      // $scope.loginName = "a" + Math.floor(Math.random() * 1000000000);
      // randomNumberForCountry = Math.floor((Math.random() * 1000) % $scope.countries.length);
      // CountryService.setMyCountry($scope.countries[randomNumberForCountry]);
      // $scope.myCountry = CountryService.getMyCountry();

      // $scope.login();
      window.open("index.html#/app/testpage");
      
      if ($scope.n > 0) {
        $timeout(function() {
            $scope.n--;
            $scope.open();
          }, 10);
      }

    };

    $scope.onlineAll = function() {
      return ContactsServiceForCountry.onlineUsersCounter;
    };

    // for (var i = 0; i < $scope.countries.length - 1; i++) {
    //   var c1 = $scope.countries[i];
      
    //   for (var j = i + 1; j < $scope.countries.length; j++) {
    //     var c2 = $scope.countries[j];

    //     if (c1.flag == c2.flag) {
    //       alert(c1.code);
    //     }
    //   };

    // };

    // alert("ok");

   //  var timeRemaining = 360; // 6 min

  	// var footer = document.getElementById("foot");
  	// var width = min(window.innerWidth, window.innerHeight) - footer.offsetHeight;

   //  $scope.style = "width:" + width + "px;height:" + width +"px;background-color: red;" +
   //      "margin-top:" + marginTop() + "px; margin-right: auto;margin-left: auto;z-index: -999 !important;";


   //  function min(a, b) {
    	
   //  	if (a < b) {
   //  		return a;
   //  	} else {
   //  		return b;
   //  	}
   //  }

   //  function marginTop() {
   //  	// alert((window.innerHeight - footer.offsetHeight - width) / 2);
   //  	return (window.innerHeight - footer.offsetHeight - width) / 2;
   //  }



   //  $scope.callTime = function() {
   //    return new Date(1970, 0, 1).setSeconds(timeRemaining);
   //  };
    
   //  $interval(function() {
   //    timeRemaining--;
   //  }, 1000);

  });