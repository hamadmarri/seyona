angular.module('phonertcdemo')
.factory('SchedulingService', function ($http, $timeout, ENV, ContactsService) {

  var loginName;
  var updateWebRtcIdInterval = 5000; // = 55000; // 55s
  var service = {};


  service.updatewebrtcid = function() {

    loginName = ContactsService.currentName;

    if (loginName == "") {
      return;
    }

    $.ajax({
      method : "POST",
      url : ENV.apiEndpoint + "/people/updatewebrtcid",
      data : "webrtcid=" + loginName,
      success : function(data, textStatus, jQxhr) {
      },
      error : function(jqXhr, textStatus, errorThrown) {
            // console.log("updateWebRtcId(): " + errorThrown);
            alert(textStatus + " " + errorThrown);
          }
        });


    $timeout(service.updatewebrtcid, updateWebRtcIdInterval);
  };


  return service;

  });