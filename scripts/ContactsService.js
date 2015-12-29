angular.module('phonertcdemo')
  .factory('ContactsService', function ($http, $interval, signaling) {
    var onlineUsers = [];
    var domain = "http://192.168.100.6:8080/EvitagenB";
    var loginName = "";
    var updateWebRtcIdInterval = 3000; // = 55000; // 55s


    signaling.on('online', function (name) {
      if (onlineUsers.indexOf(name) === -1) {
        onlineUsers.push(name);
      }
    });

    signaling.on('offline', function (name) {
      var index = onlineUsers.indexOf(name);
      if (index !== -1) {
        onlineUsers.splice(index, 1);
      }

      // deleteUserFromServer();
    });

    // function deleteUserFromServer() {
    //   $http.get(domain + '/deletemedisconnected')
    //   .then(function(response) {
    //          alert(response.status + " " + response.data);
    //        }, function(response) {
    //         alert(response.status + " " + response.data);
    //       });
    // }



    // $interval(updateWebRtcId, updateWebRtcIdInterval);

    // function updateWebRtcId() {

    //   if (loginName == "") {
    //     return;
    //   }

    //   $.ajax({
    //       method : "POST",
    //       url : domain + "/people/updatewebrtcid",
    //       data : "webrtcid=" + loginName,
    //       success : function(data, textStatus, jQxhr) {
    //       },
    //       error : function(jqXhr, textStatus, errorThrown) {
    //         // console.log("updateWebRtcId(): " + errorThrown);
    //         alert(textStatus + " " + errorThrown);
    //       }
    //     });
    // }
    
    return {
      onlineUsers: onlineUsers,
      setOnlineUsers: function (users, currentName) {
        this.currentName = currentName;
        loginName = currentName;
        
        onlineUsers.length = 0;
        users.forEach(function (user) {
          if (user !== currentName) {
            onlineUsers.push(user);
          }
        });
      }
    }
  });