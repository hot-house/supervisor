app.factory('extract', function (socket) {

    var extracts = []
    var series = []
    series[0] = [] // temperature
    series[1] = [] // luminosity
    var labels = []

    socket.on('/extract/list/response', function (data) {
      extracts = data
      for (var i = 0 ; i < extracts.length ; i++) {
        series[0][i] = extracts[i].temperature
        series[1][i] = extracts[i].luminosity
        labels[i] = extracts[i].createdAt
      }
      console.log(series, labels)
    })

    socket.on('/extract/add', function (extract) {
      extracts.push(extract)
      series[0].push(extract.temperature)
      series[1].push(extract.luminosity)
      labels.push(extract.createdAt)
    })


    socket.emit('/extract/list')

    return {
      list: function () {
        return extracts
      },
      series: function () {
        return series
      },
      labels: function () {
        return labels
      }
    }
})
