app.factory('temperature', function (socket) {

    var temperatures = []
    var series = []
    series[0] = []
    var labels = []

    socket.on('/temperature/list/response', function (data) {
      temperatures = data
      for (var i = 0 ; i < temperatures.length ; i++) {
        series[0][i] = temperatures[i].temperature
        labels[i] = temperatures[i].createdAt
      }
      console.log(series, labels)
    })

    socket.on('/temperature/add', function (temperature) {
      temperatures.push(temperature)
      series[0].push(temperature.temperature)
      labels.push(temperature.createdAt)
    })


    socket.emit('/temperature/list')

    return {
      list: function () {
        return temperatures
      },
      series: function () {
        return series
      },
      labels: function () {
        return labels
      }
    }
})
