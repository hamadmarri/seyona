angular.module('phonertcdemo')

.controller('SearchCtrl', function ($scope, $state, $timeout, $interval, ContactsService, 
		SchedulingService, MatchService, ENV) {

	$scope.contacts = ContactsService.onlineUsers;
	$scope.currentName = ContactsService.currentName;

	$scope.waitBeforePick = 10000;
	$scope.maxTryToCall = 55;
	var tipsDelay = 21000;
	$scope.dots = "";
	$scope.searchingMargin = ((window.innerWidth / 2) - 80) + "px";

	$scope.img1 = "0001";
	$scope.img2 = "0001";
	$scope.img3 = "0001";
	$scope.img4 = "0001";



	$scope.onlineUsersCount = function() {
		return  ContactsService.onlineUsers.length + 1;
	};

	// $scope.getNegative = function() {
	// 	return MatchService.getNegative();
	// };


	$scope.show = function() {
		alert(ContactsService.onlineUsers.length);
		alert(MatchService.negative);
	};


	$scope.setAsSearching = function() {
		$.ajax({
			method : "GET",
			url : ENV.apiEndpoint + "/match/setassearching",
			success : function(data, textStatus, jQxhr) {
			},
			error : function(jqXhr, textStatus, errorThrown) {
				// window.location.replace("error.html");
			}
		});
	}

	$scope.getMatches = function() {
		return MatchService.getMatches();
	};


	$scope.loadMatches = function() {

		// alert("loadMatches");

		var urlString = ENV.apiEndpoint + "/match/gettoptenmatchesfor";

		if (MatchService.getNegative() == true) {
			urlString = ENV.apiEndpoint + "/match/getleasttenmatchesfor";
		}

		if (MatchService.getMatches() == null) {
			$.ajax({
				method : "GET",
				url : urlString,
				success : function(data, textStatus, jQxhr) {


					MatchService.setMatches(data);


					// alert("loadMatches success " + MatchService.getMatches());


					// if stil null then exit, there must be an error
					if (MatchService.getMatches() == null) {
						return;
					}

					if (MatchService.getMatches().length == 0) {
						$timeout($scope.loadMatches, $scope.waitBeforePick);
						return;
					} else {
						$scope.pickRandom();
					}

				},
				error : function(jqXhr, textStatus, errorThrown) {
					// console.log(errorThrown);
					alert("!loadMatches");
					// window.location.replace("error.html");
				}
			});
		} else {
			$scope.pickRandom();
		}
	}

	$scope.pickRandom = function() {

		var rand;

		// if matches is null then it must be error, just exit
		if (MatchService.getMatches() == null) {
			// console.log("ERROR: matches is null");
			return;
		}


		rand = Math.floor((Math.random() * 10) % MatchService.getMatches().length);
		$scope.maxTryToCall--;

		// if exceed waiting limit then move to ask for new picture page
		if ($scope.maxTryToCall == 0 && MatchService.getMatches().length == 0) {
			// TODO ask if want to take another picture or use old one
			// TODO: if already called all matches, then get other top ten

			alert("askfornewpic");
			// window.location.replace("askfornewpic.html");

			return;
		}

		$scope.getOtherStatus(
			MatchService.getMatches()[rand].id, 
			MatchService.getMatches()[rand].username,
			MatchService.getMatches()[rand].webrtcid
		);
	}



	$scope.getOtherStatus = function(id, username, webrtcid) {
		$.ajax({
			method : "POST",
			url : ENV.apiEndpoint + "/people/getstatusfor",
			data : "username=" + username,
			success : function(data, textStatus, jQxhr) {
				var otherStatus = data;

				if (otherStatus == "BUSY") {
					// console.log(username + " is BUSY");
					$timeout($scope.pickRandom, $scope.waitBeforePick);

				} else if (otherStatus == "DELETED") {
					// remove from the matches list
					MatchService.removeFromMatches(id);

					// pick another on
					$timeout($scope.pickRandom, $scope.waitBeforePick);

				} else if (otherStatus == "SEARCHING") {
					$scope.gotoCall(id, webrtcid);

				} else {
					// not searching yet
					$timeout($scope.pickRandom, $scope.waitBeforePick);
				}
			},
			error : function(jqXhr, textStatus, errorThrown) {
				// console.log("getOtherStatus(): " + errorThrown);
				alert("!getOtherStatus");
				// window.location.replace("error.html");
			}
		});
	};

	$scope.gotoCall = function(id, webrtcid) {

		$.ajax({
			method : "POST",
			url : ENV.apiEndpoint + "/call",
			data : "id=" + id,
			success : function(data, textStatus, jQxhr) {
				

				alert("go");

				MatchService.setCrrentCallingId(id);

				$timeout(function() {
					$state.go('app.call', { isCalling: true, contactName: webrtcid });	
				}, 10000);
				
				// window.location.replace("call.html?" + "username=" + username
				// 		+ "&id=" + id + "&matches=" + JSON.stringify(matches));

			},
			error : function(jqXhr, textStatus, errorThrown) {
				alert("!gotoCall");
				// window.location.replace("error.html");
			}
		});
	};


	function changeTip() {
		var r = Math.floor(Math.random() * 10);  // * 100) % 11;
		
		switch (r) {
		case 0:
			$scope.tip = "If you are waiting for so long time, it is because the number of online users connected is small. Please be patient.";
			break;
		case 1:
			$scope.tip = "Take a picture in a bright place for better results";
			break;
		case 2:
			$scope.tip = "If you are waiting for so long time, it is because most of online users are busy with other calls. Please be patient.";
			break;
		case 3:
			$scope.tip = "Be the first who says Hi!";
			break;
		case 4:
			$scope.tip = "Seyona is a tool to help you find your look-alike person";
			break;
		case 5:
			$scope.tip = "Don't forget to rate me in Google Play/App Store :D";
			break;
		case 6:
			$scope.tip = "Through HELP button, you can contact us and write your suggestions.";
			break;
		case 7:
			$scope.tip = "SMILE :)";
			break;
		case 8:
			$scope.tip = "End Call button will end your call and connect you with another user.";
			break;
		case 9:
			$scope.tip = "Share Seyona with your friends. The more online people, the more chance to find your twin.";
			break;
		}
	}


	function animateSearchingDots() {
		if ($scope.dots.length % 3 == 0) {
		  $scope.dots = "";
		}

		$scope.dots += ".";
		// $scope.$apply();
	}


	$scope.smileysLuck = function() {
		runLuckFor(21);
	};


	function runLuckFor(manyTimes) {

		if (manyTimes == 0) {
			return;
		}

		manyTimes--;

		var r1 = (Math.floor(Math.random() * 10000) % 1625) + 1;
		var r2 = (Math.floor(Math.random() * 10000) % 1625) + 1;
		var r3 = (Math.floor(Math.random() * 10000) % 1625) + 1;
		var r4 = (Math.floor(Math.random() * 10000) % 1625) + 1;

		$scope.img1 = pad(r1, 4);
		$scope.img2 = pad(r2, 4);
		$scope.img3 = pad(r3, 4);
		$scope.img4 = pad(r4, 4);

		$scope.$apply();

		$timeout(function(){runLuckFor(manyTimes);}, 80);
	}


	function pad(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
	}

	changeTip();
	$interval(changeTip, tipsDelay);
	$interval(animateSearchingDots, 400);
	$timeout($scope.setAsSearching, 1000);
	$timeout($scope.loadMatches, 2000);

	SchedulingService.updatewebrtcid();
});