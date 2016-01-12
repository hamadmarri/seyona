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
  socket.on('login', function (countryPerson) {
        
    // if this socket is already connected,
    // send a failed login message name
    var index = _.findIndex(users, { socket: socket.id });
    if (index !== -1) {
      // socket.emit('login_error', 'You are already connected.');

      socket.broadcast.emit('offline', users[index].countryPerson);
      users[index].countryPerson.countryCode = countryPerson.countryCode;
      
      socket.emit('login_successful', _.pluck(users, 'countryPerson'));
      socket.broadcast.emit('online', users[index].countryPerson);

      return; 
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


  socket.on('logout', function () {
    
    var index = _.findIndex(users, { socket: socket.id });

    if (index !== -1) {
      socket.broadcast.emit('offline', users[index].countryPerson);
      users.splice(index, 1);
      // console.log(countryPerson.name + ' disconnected');
    }

  });


  socket.on('searching', function () {
    var index = _.findIndex(users, { socket: socket.id });

    users[index].countryPerson.status = "searching";

    // console.log(users[index].countryPerson.name + " is searching");
  });


  socket.on('busy', function () {
    var index = _.findIndex(users, { socket: socket.id });

    users[index].countryPerson.status = "busy";

    // console.log(users[index].countryPerson.name + " is busy");
  });


  socket.on('incrementCallsCount', function () {
    var index = _.findIndex(users, { socket: socket.id });

    users[index].countryPerson.callsCount++;

    // console.log(users[index].countryPerson.name + " have " + users[index].countryPerson.callsCount);
  });


  socket.on('find', function (query) {
   
   var index = _.findIndex(users, { socket: socket.id });
   console.log('find ' + (++findCount) + " from " + index);

    var min = -1;
    var countryPerson;

    for (var i = 0; i < users.length; i++) {
      
      console.log(users[i].name + " " + users[i].countryPerson.status);

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
      // console.log('found ' + countryPerson.name);
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
    
    io.to(contact.socket)
      .emit('messageReceived', currentUser.name, message);

  });

  socket.on('disconnect', function () {

    var index = _.findIndex(users, { socket: socket.id });
    if (index !== -1) {

      socket.broadcast.emit('offline', users[index].name);
      console.log(users[index].name + ' disconnected had ' 
          + users[index].countryPerson.callsCount + ' calls');

      users.splice(index, 1);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
