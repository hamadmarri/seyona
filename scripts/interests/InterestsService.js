angular.module('phonertcdemo')
  .factory('InterestsService', function () {
    
    var myInterests = [];

    var service = {
      myInterests: myInterests
    };

  
    return service;
  });