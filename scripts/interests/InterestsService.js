angular.module('phonertcdemo')
  .factory('InterestsService', function () {
    
    var myInterests = [];
    // var localState = 1; // busy

    var service = {
      myInterests: myInterests
      // localState: localState
    };

  
  	// service.setMeBusy = function() {
  	// 	service.localState = 1;
  	// };


  	// service.setMeSearching = function() {
  	// 	service.localState = 0;
  	// };


  	// service.amIBusy = function() {
  	// 	return (service.localState == 1);
  	// };


    return service;
  });