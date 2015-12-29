angular.module('phonertcdemo')

  .controller('ContactsCtrl', function ($scope, ContactsService, SchedulingService) {
    $scope.contacts = ContactsService.onlineUsers;
    $scope.currentName = ContactsService.currentName;

    SchedulingService.updatewebrtcid();
  });