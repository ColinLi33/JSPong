  const PI = Math.PI;
  var widthWindow = 1200;
  var heightWindow = 600;
  var numPlayerHits = 0;
  var numCompHits = 0;

  function Puck(){
    this.x = widthWindow  / 2;
    this.y = heightWindow / 2;
    this.xspeed = 12; //never negative
    this.yspeed = -12; //offset stuff
    this.r = 12;
    this.dir = 0;//(3 * PI / 4); // [0, 2pi)
    this.section;
    this.playerScore = 0;
    this.computerScore = 0;

    this.startGame = function(){
      this.playerScore = 0;
      this.computerScore = 0;
    }

    this.setSpeed = function(){
      if(getDifficulty() == 0){
        this.xspeed = 8;
        this.yspeed = -8;
      }
      else if(getDifficulty() == 2){
        this.xspeed = 15;
        this.yspeed = -15;
      }
    }

    this.show = function(){
     fill('rgb(0, 255, 255)');
     ellipse(this.x,this.y,this.r*2,this.r*2);
     ellipseMode(CENTER);
    }
    function getY(){
      return this.y;
    }
    this.reset = function(){
      this.x = widthWindow/2;
      this.y = heightWindow/2;
      if((Math.random() * 2) == 0){
         this.dir = Math.random() * 2 * PI / 4 + 2 * PI / 4;
      } else {
         this.dir = Math.random() * -PI / 3 + PI / 4 ;
      }
    }

    this.move = function(){
      this.x += this.xspeed * Math.cos(this.dir);
      this.y += this.yspeed * Math.sin(this.dir);
    }

    this.isOnEdge = function(){
      if (this.y < 0 + 12 || this.y > heightWindow - 12){
        this.hitTopOrBottom();
      }

      if (this.x < 0 || this.x > widthWindow){
        if(this.x < 0){
          this.computerScore++;
        } if(this.x > width){
           this.playerScore++;
        }
        this.reset();
      }
    }

    this.checkScore = function(){
      if(this.playerScore == 10){
        setScreen(2);
      } else if(this.computerScore == 10){
        setScreen(3);
      }
    }

    this.hitTopOrBottom = function(){
    //  xspeed++;
      //yspeed--;
        this.dir = 2 * PI - this.dir;
    }

    this.direction = function(puckY, paddleY, p){
      if(p === player){
      //  this.x = p.x + p.w + 2;
        if(puckY >= paddleY - 53 && puckY <= paddleY - 30){ //0-20
          this.dir = PI / 3 + this.dir * -.1;
        }else if(puckY > paddleY - 30 && puckY <= paddleY - 10){ //21-40
          this.dir = PI / 6 + this.dir * -.1;
        }else if(puckY > paddleY - 10 && puckY <= paddleY + 10){ //41-60
          this.dir = 0 + this.dir * -.1;
        }else if(puckY > paddleY + 10 && puckY <= paddleY + 30){ //61-80
          this.dir = -PI / 6 + this.dir * .1;
        }else if(puckY > paddleY + 30 && puckY <= paddleY + 53){ //81-100
          this.dir = -PI / 3 + this.dir * .1;
        }
        if(this.dir <= -1.308)
          this.dir = -1.308;
        if (this.dir >= 1.308)
          this.dir = 1.308;
<<<<<<< HEAD
        this.x = p.x + p.w/2 + this.r;
=======
      //  this.x = p.x + p.w/2 + this.r;
>>>>>>> f51ab45e16957bf455385f21ddcbbe3d2912c472


      } else {
      //  this.x = p.x - p.w - 2;
        if(puckY >= paddleY - 53 && puckY <= paddleY - 30){ //0-20
          this.dir = 2 * PI / 3 + this.dir * -.1;
        }else if(puckY > paddleY - 30 && puckY <= paddleY - 10){ //21-40
          this.dir = 5 * PI / 6 + this.dir * -.1;
        }else if(puckY > paddleY - 10 && puckY <= paddleY + 10){ //41-60
          this.dir = PI + this.dir * -.1;
        }else if(puckY > paddleY + 10 && puckY <= paddleY + 30){ //61-80
          this.dir = 7 * PI / 6 + this.dir * .1;
        }else if(puckY > paddleY + 30 && puckY <= paddleY + 53){ //81-100
          this.dir = 4 * PI / 3 + this.dir * .1;
        }
        if(this.dir <= PI-1.308)
          this.dir = PI-1.308;
        if (this.dir >= PI+1.308)
          this.dir = 1.308;
      //  this.x = p.x - p.w/2 - this.r;
      }

    }

    this.isTouching = function(p){
      if(p === player){
        if(this.x - this.r  <= p.x + p.w/2 + 15 && this.y + this.r <= p.y + p.h/2 + 15 && this.y - this.r >= p.y - p.h/2 - 15){
          this.direction(this.y, p.y, p);
          numPlayerHits++;
          console.log('playerHit: ' + numCompHits);
        }
      }
      if(p === computer){
        if(this.x + this.r >= p.x - p.w/2 - 15 && this.y + this.r <= p.y + p.h/2 + 15 && this.y - this.r >= p.y - p.h/2 - 15){
          this.direction(this.y, p.y, p);
          numCompHits++;
          console.log('computerHit: ' + numCompHits);
        }
      }
    }
  }
