'use strict';

module.exports = function (io) {

   io.on('connection', (socket) => {

      listenTo('sendVideo', ({io, socket, data}) => {
         io.emit('addToPlaylist', data);
      });

      listenTo('nextVideo', ({io, socket}) => {
         io.emit('nextVideo');
      });

      listenTo('unpauseVideo', ({io, socket}) => {
         io.emit('unpauseVideo');
      });

      listenTo('pauseVideo', ({io, socket}) => {
         io.emit('pauseVideo');
      });

      function listenTo(key, callback) {
         socket.on(key, (data) => {
            callback({socket, key, io, data});
         });
      }

   });

}
