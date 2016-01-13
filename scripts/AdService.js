angular.module('phonertcdemo')
  .factory('AdService', function () {
    

    var service = {}; 
	var admobid = {};
	var alreadyShown = false;


	// for iOS
	// admobid = {
	// banner: 'ca-app-pub-5303309961800524/2480031498',
	// interstitial: 'ca-app-pub-5303309961800524/6454402695'
	// };

	// for ANDROID
	admobid = {
		banner: 'ca-app-pub-5303309961800524/9401195896',
		interstitial: 'ca-app-pub-5303309961800524/1877929095'
	};


	service.runAdBanner = function() {
	    
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
	    }
	};

	service.removeBanner = function() {
		if (alreadyShown) {
			alreadyShown = false;
			AdMob.removeBanner();
		}
		
	};


	service.runAdInterstitial = function() {
		
		AdMob.prepareInterstitial({
		                     adId: admobid.interstitial,
		                     autoShow: true
		                     });

		// var r = Math.floor(Math.random() * 10) % 5;
		// if (r == 0) {
		// AdMob.prepareInterstitial({
		//                      adId: admobid.interstitial,
		//                      autoShow: true
		//                      });
		// } else {
		// AdMob.prepareInterstitial({
		//                          adId: admobid.interstitial,
		//                          autoShow: false
		//                          });
		// }
	};

  return service;
});