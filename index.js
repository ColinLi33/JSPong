const express = require('express')
const app = express()

app.use(express.static('p5'))


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.get('/', function (req, res) {
  res.render(__dirname + '/p5/index.html');
})
