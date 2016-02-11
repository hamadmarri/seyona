angular.module('phonertcdemo')
  .factory('BlacklistService', function () {
  
  	var blackList = [];

  	var service = {
      blackList: blackList
    };


    service.add = function(name) {
		  service.blackList.push(name);
    };

    service.isInBlacklist = function(name) {
    	var index = service.blackList.indexOf(name); 
    	return (index != -1);
    };

    return service;
  });