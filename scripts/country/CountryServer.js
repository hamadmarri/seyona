var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash-node');

var users = [];

app.get('/', function (req, res){
  res.sendfile('index.html');
});

io.on('connection', function (socket) {
  socket.on('login', function (countryPerson) {
        
    // if this socket is already connected,
    // send a failed login message name
    if (_.findIndex(users, { socket: socket.id }) !== -1) {
      socket.emit('login_error', 'You are already connected.');
    }

    // if this name is already registered,
    // send a failed login message
    if (_.findIndex(users, { name: countryPerson.name }) !== -1) {
      socket.emit('login_error', 'This name already exists.');
      return; 
    }

    users.push({ 
      name: countryPerson.name,
      countryPerson: countryPerson,
      socket: socket.id
    });

    socket.emit('login_successful', _.pluck(users, 'countryPerson'));
    socket.broadcast.emit('online', countryPerson);

    console.log(countryPerson);
  });


  socket.on('logout', function (countryPerson) {
    
    console.log(countryPerson);
    
    var index = _.findIndex(users, { socket: socket.id });

    users.splice(index, 1);

    socket.broadcast.emit('offline', countryPerson);

    console.log(countryPerson.name + ' disconnected');
  });


  socket.on('searching', function (query) {
    var index = _.findIndex(users, { socket: socket.id });

    users[index].countryPerson.status = "searching";

    console.log(users[index].countryPerson.name + " is searching");
  });

  socket.on('find', function (query) {
   
    var min = -1;
    var countryPerson;

    for (var i = 0; i < users.length; i++) {
      if (users[i].countryPerson.countryCode == query.countryCode
            && users[i].countryPerson.status == 'searching'
            && users[i].socket != socket.id) {

        if (
            ( min != -1 
              && users[i].countryPerson.callsCount < min
            ) 
            || min == -1
          ) {

          countryPerson = users[i].countryPerson;
          min = users[i].countryPerson.callsCount;
        } 

      }
    }

    if (min != -1) {
      socket.emit('found', countryPerson);
      console.log('found ' + countryPerson.name);
    } else {
      socket.emit('not_found', { });
      console.log('not_found');
    }

  });

  socket.on('sendMessage', function (name, message) {

    var currentUser = _.find(users, { socket: socket.id });
    if (!currentUser) { return; }

    var contact = _.find(users, { name: name });
    if (!contact) { return; }
    
    io.to(contact.socket)
      .emit('messageReceived', currentUser.name, message);

  });

  socket.on('disconnect', function () {

    var index = _.findIndex(users, { socket: socket.id });
    if (index !== -1) {
      socket.broadcast.emit('offline', users[index].name);
      console.log(users[index].name + ' disconnected');

      users.splice(index, 1);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
