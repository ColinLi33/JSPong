const express = require('express')
const app = express()
const socket = require('socket.io')
app.use(express.static('p5'))

let server = app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.get('/', function (req, res) {
  res.render(__dirname + '/index.html');
})


let io  = socket(server);

io.on('connection', function(socket){
  console.log(`Connected to socket ${socket.id}`);
})
