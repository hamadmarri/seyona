angular.module('phonertcdemo')

  .controller('PickOtherCountryCtrl', function ($scope, $state, $interval, $timeout, signaling, CountryService, ContactsServiceForCountry) {
 
    $scope.countries = CountryService.getCountries();
    $scope.limit = 21;
    $scope.myCountry = CountryService.getMyCountry();




    $scope.loadMore = function() {
      $scope.limit += 21;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    };


    $scope.pickCountry = function(c) {
      alert(c.name);
    };



  });