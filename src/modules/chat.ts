import * as socket from 'socket.io';

let userNumber = 0;

function updateUserNumber(io, num: number) {
  userNumber += num;
  io.emit('updateUserNumber', {
    userNumber
  });
}

export default function (http) {
  const io = socket(http);

  io.on('connection', function(socket){
    updateUserNumber(io, 1);
    socket.on('chat message', function(info){
      io.emit('chat message', info);
    });

    socket.on('disconnect', function(){
      updateUserNumber(socket,- 1);
    });
  });
}
