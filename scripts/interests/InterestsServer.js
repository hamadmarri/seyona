var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash-node');

var users = [];
var findCount = 0;

app.get('/', function (req, res){
  res.sendfile('index.html');
});

io.on('connection', function (socket) {
  socket.on('login', function (interestsPerson) {
        
    // if this socket is already connected,
    // send a failed login message name
    var index = _.findIndex(users, { socket: socket.id });
    if (index !== -1) {
      // socket.emit('login_error', 'You are already connected.');

      socket.broadcast.emit('offline', users[index].interestsPerson);
      users[index].interestsPerson.interests = interestsPerson.interests;
      
      socket.emit('login_successful', _.pluck(users, 'interestsPerson'));
      socket.broadcast.emit('online', users[index].interestsPerson);

      return; 
    }

    // if this name is already registered,
    // send a failed login message
    if (_.findIndex(users, { name: interestsPerson.name }) !== -1) {
      socket.emit('login_error', 'This name already exists.');
      return; 
    }

    users.push({ 
      name: interestsPerson.name,
      interestsPerson: interestsPerson,
      socket: socket.id
    });

    socket.emit('login_successful', _.pluck(users, 'interestsPerson'));
    socket.broadcast.emit('online', interestsPerson);

    console.log(interestsPerson);
  });


  socket.on('logout', function () {
    
    var index = _.findIndex(users, { socket: socket.id });

    if (index !== -1) {
      socket.broadcast.emit('offline', users[index].interestsPerson);
      users.splice(index, 1);
      // console.log(interestsPerson.name + ' disconnected');
    }

  });


  socket.on('searching', function () {
    var index = _.findIndex(users, { socket: socket.id });

    if (index !== -1) {
      users[index].interestsPerson.status = 0; // searching
    }

    // console.log(users[index].interestsPerson.name + " is searching");
  });


  socket.on('busy', function () {
    var index = _.findIndex(users, { socket: socket.id });

    if (index !== -1) {
      users[index].interestsPerson.status = 1; // busy
    }

    // console.log(users[index].interestsPerson.name + " is busy");
  });


  socket.on('incrementCallsCount', function () {
    var index = _.findIndex(users, { socket: socket.id });

    users[index].interestsPerson.callsCount++;

    // console.log(users[index].interestsPerson.name + " have " + users[index].interestsPerson.callsCount);
  });


  socket.on('find', function (query) {
   
   var index = _.findIndex(users, { socket: socket.id });
   console.log('find ' + (++findCount) + " from " + index);

    var min = -1;
    var interestsPerson;
    var atLeastOne = false;

    for (var i = 0; i < users.length; i++) {
      
      console.log(users[i].name + " " + users[i].interestsPerson.status + " calls " + users[i].interestsPerson.callsCount);

      atLeastOne = false;

      // minimum calls and at least one common interest
      if (users[i].interestsPerson.status == 0 // searching
            && users[i].socket != socket.id) {

            
            for (var j = 0; j < query.interests.length; j++) {
              for (var k = 0; k < users[i].interestsPerson.interests.length; k++) {

                if (users[i].interestsPerson.interests[k] == query.interests[j]) {
                  atLeastOne = true;
                  break;
                }
              }

              if (atLeastOne) {
                break;
              }

            }


            if (atLeastOne) {
              if (
                  ( min != -1 
                    && users[i].interestsPerson.callsCount < min
                  ) 
                  || min == -1
                ) {

                interestsPerson = users[i].interestsPerson;
                min = users[i].interestsPerson.callsCount;
              }  
            }
      }
    }

    if (min != -1) {
      socket.emit('found', interestsPerson);
      // console.log('found ' + interestsPerson.name);
    } else {
      socket.emit('not_found', { });
      // console.log('not_found');
    }

  });

  socket.on('sendMessage', function (name, message) {

    var currentUser = _.find(users, { socket: socket.id });
    if (!currentUser) { return; }

    var contact = _.find(users, { name: name });
    if (!contact) { return; }
    

    // console.log(message);

    io.to(contact.socket)
      .emit('messageReceived', currentUser.name, message);

  });

  socket.on('disconnect', function () {

    var index = _.findIndex(users, { socket: socket.id });
    if (index !== -1) {

      socket.broadcast.emit('offline', users[index].name);
      console.log(users[index].name + ' disconnected had ' 
          + users[index].interestsPerson.callsCount + ' calls');

      users.splice(index, 1);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
