angular.module('phonertcdemo')
  .factory('AdService', function () {
    

    var service = {}; 
	var admobid = {};
	var alreadyShown = false;


	// for ANDROID
	admobid = {
		banner: 'ca-app-pub-5303309961800524/9401195896',
		interstitial: 'ca-app-pub-5303309961800524/1877929095'
	};



	service.runAdBanner = function() {

		 document.addEventListener('deviceready', function() {
		 	    
		 	    if (!alreadyShown) {
		 	    	AdMob.createBanner( {
		 	    	                   adId: admobid.banner,
		 	    	                   isTesting: true,
		 	    	                   overlap: false,
		 	    	                   offsetTopBar: true,
		 	    	                   position: 2,
		 	    	                   bgColor: 'black'
		 	    	                   } );
		 	    	

		 	    	AdMob.prepareInterstitial({
		 	    	                          adId: admobid.interstitial,
		 	    	                          autoShow: false
		 	    	                          });


		 			alreadyShown = true;	
		 	    } else {
		 	    	AdMob.showBanner();
		 	    }

		 }, false);
	    
	};

	service.removeBanner = function() {
		if (alreadyShown) {
			alreadyShown = false;
			AdMob.hideBanner();
		}
		
	};


	service.runAdInterstitial = function() {
		var r = Math.floor(Math.random() * 10) % 2;

		if (r == 0) {
			
			AdMob.prepareInterstitial({
					                     adId: admobid.interstitial,
					                     autoShow: true
					                     });
		}

	};

  return service;
});