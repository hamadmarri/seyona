angular.module('phonertcdemo')
.factory('ProfileService', function (FileService) {

  var profile = {
    username: "",
    image: "",
    countryCode: "",
    age: "",
    gender: ""
  };

  var service = {
    profile: profile,
    status: ""
  };


  service.load = function() {
    service.status = "loading";

    FileService.read();

    service.doReading();
  };


  service.doReading = function() {
    var read = "";
    setTimeout(function() { 
      read = FileService.data;

      if (FileService.status != "done") {
        service.doReading();
      } else {
        if (read != "") {
          service.profile = angular.fromJson(read);
        }
        service.status = "done";
      }
      
     }, 500);
  };


  return service;
});