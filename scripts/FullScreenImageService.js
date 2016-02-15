angular.module('phonertcdemo')
  .factory('FullScreenImageService', function ($ionicModal) {


  	var service = {
  		modal: null,
      customTemp: ""
  	};


  	service.openModal = function(clientScope, imageData) {

  	  var modalTemp = '<div class="modal image-modal transparent" ng-click="closeModal()">' +
  	        '<ion-pane class="transparent">' +
  	        '<img id="modalPhoto" src="' + imageData + '" class="fullscreen-image"/>' +
            service.customTemp +
  	      '</ion-pane>' +
  	    '</div>';


  	  service.modal = $ionicModal.fromTemplate(modalTemp, {
  	    scope: clientScope,
  	    animation: 'slide-in-up'
  	  });

  	  service.modal.show();
  	};

  	service.closeModal = function() {
  	  service.modal.hide();
      service.customTemp = "";
  	};


  	//Cleanup the modal when we're done with it!
  	service.removeModal = function() {
  		service.modal.remove();
      service.customTemp = "";
  	};


  	return service;
  });