angular.module('phonertcdemo')
.factory('MatchService', function ($http, $timeout, ENV) {

  var negative = false;
  var matches = null;
  var currentCallingId = -1;

  var service = {};

  var currentMatchPercent = -1;


  service.getNegative = function() {
    return negative;
  };

  service.setNegative = function(n) {
    negative = n;
  };


  service.getMatches = function() {
    return matches;
  };


  service.setCurrentMatchPercent = function(p) {
    currentMatchPercent = p;
  };

  service.getCurrentMatchPercent = function() {
    return currentMatchPercent;
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

    if (matches == null) {
      return;
    }

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


  service.getMatch = function(id) {
    if (matches == null || id == -1) {
      var m = {matchingPercent: "-1"};
      return m;
    }

    var i = -1;
    $.each(matches, function(index, item) {
      if (item.id == id) {
        i = index;
      }
    });

    return matches[i];
  };


  service.removeCrrentCallingIdFromMatches = function() {

    if (matches == null) {
      return;
    }
    
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