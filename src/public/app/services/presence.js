app.factory('presence', function (socket) {

    var presence = ''

    socket.on('/presence/response', function (data) {
      presence = data
      console.log('get presence')
    })


    socket.emit('/presence')

    return {
      presence: function () {
        return presence
      }
    }
})
