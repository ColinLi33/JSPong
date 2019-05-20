  const PI = Math.PI;
  var widthWindow = 1200;
  var heightWindow = 600;
  function Puck(){
    this.x = widthWindow  / 2;
    this.y = heightWindow / 2;
    this.xspeed = 11; //never negative
    this.yspeed = -11; //offset stuff
    this.r = 12;
    this.dir = (3 * PI / 4); // [0, 2pi)
    this.section;
    this.playerScore = 0;
    this.computerScore = 0;

    this.show = function(){
     fill(255);
     ellipse(this.x,this.y,this.r*2,this.r*2);
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

    this.hitTopOrBottom = function(){
    //  xspeed++;
      //yspeed--;
        this.dir = 2 * PI - this.dir;
    }

    this.direction = function(puckY, paddleY, p){
      if(p === player){
      //  this.x = p.x + p.w + 2;
        if(puckY >= paddleY - 50 && puckY <= paddleY - 30){ //0-20
          this.dir = PI / 3 + this.dir * -.1;
        }else if(puckY > paddleY - 30 && puckY <= paddleY - 10){ //21-40
          this.dir = PI / 6 + this.dir * -.1;
        }else if(puckY > paddleY - 10 && puckY <= paddleY + 10){ //41-60
          this.dir = 0 + this.dir * -.1;
        }else if(puckY > paddleY + 10 && puckY <= paddleY + 30){ //61-80
          this.dir = 11 * PI / 6 + this.dir * .1;
        }else if(puckY > paddleY + 30 && puckY <= paddleY + 50){ //81-100
          this.dir = 5 * PI / 3 + this.dir * .1;
        }

      } else {
      //  this.x = p.x - p.w - 2;
        if(puckY >= paddleY - 50 && puckY <= paddleY - 30){ //0-20
          this.dir = 4 * PI / 3 + this.dir * -.1;
        }else if(puckY > paddleY - 30 && puckY <= paddleY - 10){ //21-40
          this.dir = 5 * PI / 6 + this.dir * -.1;
        }else if(puckY > paddleY - 10 && puckY <= paddleY + 10){ //41-60
          this.dir = PI + this.dir * -.1;
        }else if(puckY > paddleY + 10 && puckY <= paddleY + 30){ //61-80
          this.dir = 7 * PI / 6 + this.dir * .1;
        }else if(puckY > paddleY + 30 && puckY <= paddleY + 50){ //81-100
          this.dir = 4 * PI / 3 + this.dir * .1;
        }

      }

    }

    this.isTouching = function(p){
      if(p === player){
        if(this.x - this.r <= p.x + p.w/2 && this.y + this.r < p.y + p.h/2 && this.y - this.r > p.y - p.h/2){
          this.direction(this.y, p.y, p);
        }
      }
      if(p === computer){
        if(this.x + this.r >= p.x - p.w/2 && this.y + this.r < p.y + p.h/2 && this.y - this.r > p.y - p.h/2){
          this.direction(this.y, p.y, p);
        }
      }
    }
  }
