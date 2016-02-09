angular.module('phonertcdemo')
  .factory('BlacklistService', function () {
  
  	var blackList = [];

  	var service = {
    };


    service.add = function(name) {
		blackList.push(name);
    };

    service.isInBlacklist = function(name) {
    	var index = blackList.indexOf(name); 
    	return (index != -1);
    };

    return service;
  });