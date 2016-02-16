angular.module('phonertcdemo')
.factory('ProfileService', function (FileService, CountryService) {

  var profile = {
    username: "",
    image: "",
    countryCode: "",
    age: "",
    gender: "",
    faceImage: ""
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

          CountryService.setMyCountry(CountryService.find(service.profile.countryCode));
        }
        service.status = "done";
      }
      
     }, 500);
  };



  service.save = function() {
    FileService.write(angular.toJson(service.profile));
    CountryService.setMyCountry(CountryService.find(service.profile.countryCode));
  };


  return service;
});