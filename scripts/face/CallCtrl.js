angular.module('phonertcdemo')

  .controller('CallCtrl', function ($scope, $state, $rootScope, $timeout, $interval, 
      $ionicModal, $stateParams, signaling, ContactsService, MatchService, ENV, AdService) {
    
    var duplicateMessages = [];

    $scope.callInProgress = false;

    $scope.isCalling = $stateParams.isCalling === 'true';
    $scope.contactName = $stateParams.contactName;


    $scope.contacts = {};
    $scope.hideFromContactList = [$scope.contactName];
    $scope.muted = false;

    var timeRemaining = 300; // 5min
    
    $scope.percentage;

    var intervalPromis;


    $scope.callTime = function() {
      return new Date(1970, 0, 1).setSeconds(timeRemaining);
    };


    $ionicModal.fromTemplateUrl('templates/select_contact.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.selectContactModal = modal;
    });

    function call(isInitiator, contactName) {
      console.log(new Date().toString() + ': calling to ' + contactName + ', isInitiator: ' + isInitiator);

      var config = { 
        isInitiator: isInitiator,
        turn: {
          host: 'turn:ec2-54-68-238-149.us-west-2.compute.amazonaws.com:3478',
          username: 'test',
          password: 'test'
        },
        streams: {
          audio: true,
          video: true
        }
      };

      var session = new cordova.plugins.phonertc.Session(config);
      
      session.on('sendMessage', function (data) { 
        signaling.emit('sendMessage', contactName, { 
          type: 'phonertc_handshake',
          data: JSON.stringify(data)
        });
      });

      session.on('answer', function () {
        console.log('Answered!');
      });

      session.on('disconnect', function () {
        if ($scope.contacts[contactName]) {
          delete $scope.contacts[contactName];
        }

        if (Object.keys($scope.contacts).length === 0) {
          signaling.emit('sendMessage', contactName, { type: 'ignore' });

          if(intervalPromis) {
              $interval.cancel(intervalPromis); 
          }

          MatchService.removeCrrentCallingIdFromMatches();

          AdService.runAdBanner();
          AdService.runAdInterstitial();

          $state.go('app.search');
        }
      });

      session.call();

      $scope.contacts[contactName] = session; 
    }

    if ($scope.isCalling) {
      // alert(MatchService.getCrrentCallingId());

      $scope.percentage = MatchService.getMatch(MatchService.getCrrentCallingId()).matchingPercent;

      signaling.emit('sendMessage', $stateParams.contactName, { type: 'call', matchId: MatchService.getCrrentCallingId(), percentage: $scope.percentage });
    } else {
      $scope.percentage = MatchService.getCurrentMatchPercent();
    }

    $scope.ignore = function () {
      var contactNames = Object.keys($scope.contacts);
      if (contactNames.length > 0) { 
        $scope.contacts[contactNames[0]].disconnect();
      } else {
        signaling.emit('sendMessage', $stateParams.contactName, { type: 'ignore' });

        MatchService.removeCrrentCallingIdFromMatches();
        $state.go('app.search');
      }
    };

    $scope.end = function () {

      if(intervalPromis) {
          $interval.cancel(intervalPromis); 
      }
      
      Object.keys($scope.contacts).forEach(function (contact) {
        $scope.contacts[contact].close();
        delete $scope.contacts[contact];

        $.ajax({
            method : "POST",
            url : ENV.apiEndpoint + "/call/end",
            data : "id=" + MatchService.getCrrentCallingId(),
            success : function(data, textStatus, jQxhr) {
            },
            error : function(jqXhr, textStatus, errorThrown) {
              // console.log("endCall(): " + errorThrown);
              // alert("!");
              // window.location.replace("error.html");
            }
          });

        MatchService.removeCrrentCallingIdFromMatches();

      });
    };

    $scope.answer = function () {
      if ($scope.callInProgress) { return; }

      $scope.callInProgress = true;
      $timeout($scope.updateVideoPosition, 1000);

      call(false, $stateParams.contactName);

      setTimeout(function () {
        console.log('sending answer');
        signaling.emit('sendMessage', $stateParams.contactName, { type: 'answer' });
      }, 1500);
    };

    $scope.updateVideoPosition = function () {
      $rootScope.$broadcast('videoView.updatePosition');
    };

    $scope.openSelectContactModal = function () {
      cordova.plugins.phonertc.hideVideoView();
      $scope.selectContactModal.show();
    };

    $scope.closeSelectContactModal = function () {
      cordova.plugins.phonertc.showVideoView();
      $scope.selectContactModal.hide();      
    };

    $scope.addContact = function (newContact) {
      $scope.hideFromContactList.push(newContact);
      signaling.emit('sendMessage', newContact, { type: 'call' });

      cordova.plugins.phonertc.showVideoView();
      $scope.selectContactModal.hide();
    };

    $scope.hideCurrentUsers = function () {
      return function (item) {
        return $scope.hideFromContactList.indexOf(item) === -1;
      };
    };

    $scope.toggleMute = function () {
      $scope.muted = !$scope.muted;

      Object.keys($scope.contacts).forEach(function (contact) {
        var session = $scope.contacts[contact];
        session.streams.audio = !$scope.muted;
        session.renegotiate();
      });
    };

    function onMessageReceive (name, message) {
      switch (message.type) {
        case 'answer':
          $scope.$apply(function () {
            $scope.callInProgress = true;
            $timeout($scope.updateVideoPosition, 1000);
          });

          var existingContacts = Object.keys($scope.contacts);
          if (existingContacts.length !== 0) {
            signaling.emit('sendMessage', name, {
              type: 'add_to_group',
              contacts: existingContacts,
              isInitiator: false
            });
          }

          call(true, name);
          break;

        case 'ignore':
          var len = Object.keys($scope.contacts).length;
          if (len > 0) { 
            if ($scope.contacts[name]) {
              $scope.contacts[name].close();
              delete $scope.contacts[name];
            }

            var i = $scope.hideFromContactList.indexOf(name);
            if (i > -1) {
              $scope.hideFromContactList.splice(i, 1);
            }

            if (Object.keys($scope.contacts).length === 0) {
              MatchService.removeCrrentCallingIdFromMatches();
              $state.go('app.search');
            }
          } else {
            MatchService.removeCrrentCallingIdFromMatches();
            $state.go('app.search');
          }

          break;

        case 'phonertc_handshake':
          if (duplicateMessages.indexOf(message.data) === -1) {
            $scope.contacts[name].receiveMessage(JSON.parse(message.data));
            duplicateMessages.push(message.data);
          }
          
          break;

        case 'add_to_group':
          message.contacts.forEach(function (contact) {
            $scope.hideFromContactList.push(contact);
            call(message.isInitiator, contact);

            if (!message.isInitiator) {
              $timeout(function () {
                signaling.emit('sendMessage', contact, { 
                  type: 'add_to_group',
                  contacts: [ContactsService.currentName],
                  isInitiator: true
                });
              }, 1500);
            }
          });

          break;
      } 
    }

    signaling.on('messageReceived', onMessageReceive);

    $scope.$on('$destroy', function() { 
      signaling.removeListener('messageReceived', onMessageReceive);
    });




  $scope.init = function() {
    
    AdService.removeBanner();

    intervalPromis = $interval(function() {
        if (timeRemaining <= 0) {
          $scope.end();
        }

        timeRemaining--;
      }, 1000);

  };

    

  });