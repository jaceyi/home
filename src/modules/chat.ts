import * as socket from 'socket.io';

export default function (http) {
  const io = socket(http);

  io.on('connection', function(socket){
    io.emit('updateUserCount', {
      userCount: io.engine.clientsCount
    });

    socket.on('chat message', function(info){
      io.emit('chat message', info);
    });

    socket.on('disconnect', function(){
      io.emit('updateUserCount', {
        userCount: io.engine.clientsCount
      });
    });
  });
}
