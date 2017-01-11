'use strict';

module.exports = function (io) {

   io.on('connection', (socket) => {
      console.log('connected');

      socket.on('sendVideo', (id) => {
         io.emit('video', id);
      });

      socket.on('sendPlay', () => {
         io.emit('play');
      });

      socket.on('sendPause', () => {
         io.emit('pause');
      });

      socket.on('sendStop', () => {
         io.emit('stop');
      });

   });

}
