angular.module('phonertcdemo')

  .controller('PickMyCountryCtrl', function ($scope, $state, CountryService) {
 
    $scope.countries = CountryService.getCountries();
    $scope.limit = 21;


    $scope.loadMore = function() {

      $scope.limit += 21;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    };


    $scope.pickCountry = function(c) {
      CountryService.setMyCountry(c);
      $scope.myCountry = CountryService.getMyCountry();

      $state.go('app.welcomecountry');
    };
    
  });