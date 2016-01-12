angular.module('phonertcdemo')

  .controller('PickInterestsCtrl', function ($scope, $state, InterestsService) {
 
    $scope.myInterests = [];

    $scope.add = function(i) {
      $scope.myInterests.push(i);
    };


    $scope.delete = function(i) {
      var index = $scope.myInterests.indexOf(i);

      if (index > -1) {
          $scope.myInterests.splice(index, 1);
      }
    };

    $scope.search = function(c) {
      CountryService.setMyCountry(c);
      $scope.myCountry = CountryService.getMyCountry();

      $state.go('app.searchinginterests');
    };
    

  });