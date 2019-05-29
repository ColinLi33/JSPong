const express = require('express')
const app = express()
const socket = require('socket.io')
app.use(express.static('p5'))
let paddleCount = 0;
let socketObj = {
  player1 : {
    paddle: null,
    puck: null
  },
  player2 : {
    paddle: null,
    puck: null
  }
};

let server = app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.get('/', function (req, res) {
  res.render(__dirname + '/index.html');
})


let io  = socket(server);
io.on('connection', function(socket){
  console.log(`Connected to ${socket.id}`);
  io.sockets.emit('whoAreYou');
  socket.on('imaPaddle', function(){

    paddleCount++;
    socketObj[`player${paddleCount}`].paddle = socket.id;
    console.log(socketObj)
    if(paddleCount == 2){
      io.sockets.emit('startGame');
      io.to(socketObj.player1.paddle).emit('startWithPuck')
    }
  });

})
