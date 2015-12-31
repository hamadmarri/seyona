angular.module('phonertcdemo')
.factory('MatchService', function ($http, $timeout, ENV) {

  var negative = false;
  var matches = null;
  var currentCallingId;

  var service = {};


  service.getNegative = function() {
    return negative;
  };

  service.setNegative = function(n) {
    negative = n;
  };


  service.getMatches = function() {
    return matches;
  };


  service.setMatches = function(m) {
    matches = m;


    // convert to negative value if negative is true
    if (matches != null && matches.length > 0 && negative == true) {
      $.each(matches, function(i, item) {
        item.matchingPercent = item.matchingPercent - 100;
      });
    }
  };


  service.getCrrentCallingId = function() {
    return currentCallingId;
  };

  service.setCrrentCallingId = function(c) {
    currentCallingId = c;
  };

  service.removeFromMatches = function(id) {
    var i = -1;
    $.each(matches, function(index, item) {
      if (item.id == id) {
        i = index;
      }
    });

    // if is not there
    if (i != -1) {
      matches.splice(i, 1);
    }
  };


  service.removeCrrentCallingIdFromMatches = function() {

    // alert("removeCrrentCallingIdFromMatches " + currentCallingId);

    var i = -1;
    $.each(matches, function(index, item) {
      if (item.id == currentCallingId) {
        i = index;
      }
    });

    // if is not there
    if (i != -1) {
      matches.splice(i, 1);
    }
  };

  return service;

  });