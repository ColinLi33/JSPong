let socket = io.connect("http://localhost:3000");
socket.on('whoAreYou', function(){
  console.log('bruh')
  socket.emit('imaPaddle');
})

var widthWindow = 1200;
var heightWindow = 600;

function Paddle(player){
  this.x;
  this.y = heightWindow / 2;
  this.w = 30;
  this.h = 100;
  if(player){
    this.x = this.w + 10;
  } else {
    this.x =  widthWindow - this.w - 10;
  }
  this.getX = function() {
    return this.x;
  }
  this.getY = function() {
    return this.y;
  }
  this.getW = function() {
    return this.w;
  }
  this.getH = function() {
    return this.h;
  }
  this.show = function(){
    fill('rgb(0,255,0)');
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }
  this.AI = function(difficulty, p){
    if(difficulty == 3)
    {
      this.y = p.y;
    }
    else {

    this.MAXSPEED = 0.0;
    switch (difficulty){
       case 0:
         this.MAXSPEED = 6;
         this.speed = (p.y - this.y)/15;
         break;
       case 1:
         this.MAXSPEED = 10;
         this.speed = (p.y - this.y)/10;
         break;
       case 2:
         this.MAXSPEED = 15;
         this.speed = (p.y - this.y)/5.25;
         break;
    //   case 3:
  //       this.y = p.y;
    //     break;
       default:
         System.out.println("AI speed error");
         break;
    }

    if(this.speed > this.MAXSPEED)
      this.speed = this.MAXSPEED;
    this.y += this.speed;
    this.constrainedY = constrain(this.y, 50, height - 50);
    this.y = this.constrainedY;
  }
  }
  this.move = function(){
      this.constrainedY = constrain(mouseY, 50, height - 50);
      this.y = this.constrainedY;
  }
}
