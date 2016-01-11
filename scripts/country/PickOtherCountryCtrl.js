angular.module('phonertcdemo')

  .controller('PickOtherCountryCtrl', function ($scope, $state, $interval,
     $timeout, signaling, CountryService, ContactsServiceForCountry) {
 
    $scope.countries = CountryService.getCountries();
    $scope.limit = 21;
    $scope.myCountry = CountryService.getMyCountry();




    $scope.loadMore = function() {
      $scope.limit += 21;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    };



    // for logout
    $scope.logout = function() {

      var countryPerson = {
        name: ContactsServiceForCountry.currentName,
        countryCode: $scope.myCountry.code
      };
      
      signaling.emit('logout', countryPerson);

      $state.go('app.pickmycountry');
    };


    $scope.pickCountry = function(c) {
      CountryService.setCallingCountryCode(c.code);
      // alert(CountryService.getCallingCountryCode());

      signaling.emit('searching', { callingCountryCode: c.code });
      
      // $state.go('app.searchingcountry');
    };



  });