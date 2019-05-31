const express = require('express')
const app = express()
var fs = require('fs')
var highScore;
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


  function updateHighScore(score){
    fs.writeFile("highScore.txt", score, (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
  }

  fs.readFile('highscore.txt', "utf-8", function(err, score){
    if(err) { console.log(err) }
    highScore = score;
  })

  function getHighScore(){
    return highScore;
  }


let io  = socket(server);
io.on('connection', function(socket){
  console.log(`Connected to ${socket.id}`);
  io.sockets.emit('highscore', highScore);
  socket.on('updateHighScore', function(score){
    updateHighScore(score);
    highScore = score;
    io.sockets.emit('highscore', highScore);
  });
});
