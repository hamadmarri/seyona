angular.module('phonertcdemo')
  .factory('DeleteService', function ($http, ENV) {
    
    var service = {};


    /*
      delete matches
      delete image
      delete person record
    */
    service.deleteAllUserDataOnServer = function() {
      $.ajax({
          method : "GET",
          url : ENV.apiEndpoint + "/people/deletemedisconnected",
          success : function(data, textStatus, jQxhr) {
          },
          error : function(jqXhr, textStatus, errorThrown) {
            // console.log(errorThrown);
          }
        });
    };


    service.deleteMe = function() {
      $.ajax({
          method : "GET",
          url : ENV.apiEndpoint + "/people/deleteme",
          success : function(data, textStatus, jQxhr) {
          },
          error : function(jqXhr, textStatus, errorThrown) {
            // console.log(errorThrown);
          }
        });
    };


    service.deleteMyImage = function() {
      $.ajax({
          method : "GET",
          url : ENV.apiEndpoint + "/people/deleteimage",
          success : function(data, textStatus, jQxhr) {
          },
          error : function(jqXhr, textStatus, errorThrown) {
            // console.log(errorThrown);
          }
        });
    };


    return service;
  });