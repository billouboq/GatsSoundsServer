'use strict';

module.exports = function (io) {

   io.on('connection', (socket) => {

      console.log('connected');

      listenTo('addToPlaylist', ({io, socket, data}) => {
         console.log('addToPlaylist');
         io.emit('sendVideo', data);
      });

      function listenTo(key, callback) {
         socket.on(key, (data) => {
            callback({socket, key, io, data});
         });
      }

   });

}
