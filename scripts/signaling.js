angular.module('phonertcdemo')
  .factory('signaling', function (socketFactory) {
    var socket = io.connect('http://seyona.com:3000/'); // http://192.168.100.21:3000/
    
    var socketFactory = socketFactory({
      ioSocket: socket
    });

    return socketFactory;
  })

  .factory('signalingCountry', function (socketFactory) {
    var socket = io.connect('http://seyona.com:3001/');
    
    var socketFactory = socketFactory({
      ioSocket: socket
    });

    return socketFactory;
  })

  .factory('signalingInterests', function (socketFactory) {
    var socket = io.connect('http://seyona.com:3002/');
    
    var socketFactory = socketFactory({
      ioSocket: socket
    });

    return socketFactory;
  })






  ;
