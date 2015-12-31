angular.module('phonertcdemo')

.controller('SearchCtrl', function ($scope, $state, $timeout, ContactsService, SchedulingService, MatchService, ENV) {
	$scope.contacts = ContactsService.onlineUsers;
	$scope.currentName = ContactsService.currentName;

	$scope.waitBeforePick = 10000;
	$scope.maxTryToCall = 55;

	$scope.onlineUsersCount = function() {
		return  ContactsService.onlineUsers.length + 1;
	};

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
		if ($scope.maxTryToCall == 0 || MatchService.getMatches().length == 0) {
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

				$state.go('app.call', { isCalling: true, contactName: webrtcid });
				// window.location.replace("call.html?" + "username=" + username
				// 		+ "&id=" + id + "&matches=" + JSON.stringify(matches));

			},
			error : function(jqXhr, textStatus, errorThrown) {
				alert("!gotoCall");
				// window.location.replace("error.html");
			}
		});
	};


	$timeout($scope.setAsSearching, 1000);
	$timeout($scope.loadMatches, 2000);

	SchedulingService.updatewebrtcid();
});