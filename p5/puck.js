var highScore;

let socket = io.connect("https://pongmasterserver.herokuapp.com");
socket.on('highscore', function(score) {
    console.log('score' + score);
    highScore = score;
    Puck.highScore = highScore;

})

const PI = Math.PI;
var widthWindow = 1200;
var heightWindow = 600;
var numPlayerHits = 0;
var numCompHits = 0;
var playerPaddle;


function Puck() {
    this.x = widthWindow / 2;
    this.y = heightWindow / 2;
    this.xspeed = 12; //never negative
    this.yspeed = -12; //offset stuff
    this.r = 12;
    this.dir = (3 * PI / 4); //[0, 2pi)
    this.section;
    this.playerScore = 0;
    this.computerScore = 0;
    this.defaultSpeed = 12;
    this.highScore = highScore;

    this.startGame = function() {
        this.playerScore = 0;
        this.computerScore = 0;
    }

    this.setSpeed = function(p) {
        playerPaddle = p;
        if (getDifficulty() == 0) {
            this.xspeed = 8;
            this.yspeed = -8;
            this.defaultSpeed = 8;
        } else if (getDifficulty() == 2 || getDifficulty() == 3) {
            this.xspeed = 15;
            this.yspeed = -15;
            this.defaultSpeed = 15;
        }
    }

    this.show = function() {
        fill('rgb(0, 255, 255)');
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        ellipseMode(CENTER);
    }

    function getY() {
        return this.y;
    }
    this.reset = function() {
        this.x = widthWindow / 2;
        this.y = heightWindow / 2;
        this.xspeed = this.defaultSpeed;
        this.yspeed = this.defaultSpeed * -1;
        playerPaddle.resetH();
        if ((Math.random() * 2) > 1) {
            this.dir = Math.random() * 2 * PI / 4 + 3 * PI / 4;
        } else {
            this.dir = Math.random() * PI / 3 - PI / 6;
        }
    }

    this.move = function() {
        this.x += this.xspeed * Math.cos(this.dir);
        this.y += this.yspeed * Math.sin(this.dir);
    }

    this.isOnEdge = function() {
        if (this.y < 0 + 12 || this.y > heightWindow - 12) {
            this.hitTopOrBottom();
        }
        if (getDifficulty() !== 3) {
            if (this.x < 0 || this.x > widthWindow) {
                if (this.x < 0) {
                    this.computerScore++;
                }
                if (this.x > width) {
                    this.playerScore++;
                }
                this.reset();
            }
        } else {
            if (this.x < 0) {
                if (this.playerScore > this.highScore) {
                    this.highScore = this.playerScore;
                    socket.emit('updateHighScore', this.highScore);
                    this.highScore = highScore;
                }
                this.playerScore = 0;
                this.reset();
            }
        }
    }



    this.checkScore = function() {
        if (getDifficulty() !== 3) {
            if (this.playerScore == 10) {
                setScreen(2);
                this.playerScore = 0;
                this.computerScore = 0;
            } else if (this.computerScore == 10) {
                setScreen(3);
                this.playerScore = 0;
                this.computerScore = 0;
            }
        }
    }

    this.hitTopOrBottom = function() {
        if (this.x < 1160 && this.x > 40)
            this.dir = 2 * PI - this.dir;
    }

    this.direction = function(puckY, paddleY, p, h) {
        if (this.dir >= 2 * PI)
            this.dir = this.dir - 2 * PI
        if (this.dir <= -2 * PI)
            this.dir = this.dir + 2 * PI
        if (p === player) {
            if (getDifficulty() == 3)
                this.playerScore += 10;
            //  this.x = p.x + p.w + 2;
            console.log(p.h);
            if (puckY >= paddleY - p.h / 2 - 3 && puckY <= paddleY - (0.3 * p.h)) { //0-20
                this.dir = PI / 3 - Math.abs(this.dir * .1);
                console.log('top');
            } else if (puckY > paddleY - (0.3 * p.h) && puckY <= paddleY - (0.1 * p.h)) { //21-40
                this.dir = PI / 6 - Math.abs(this.dir * .1);
                console.log('2');
            } else if (puckY > paddleY - (0.1 * p.h) && puckY <= paddleY + (0.1 * p.h)) { //41-60
                this.dir = 0 + this.dir * -.1;
                console.log('3');
            } else if (puckY > paddleY + (0.1 * p.h) && puckY <= paddleY + (0.3 * p.h)) { //61-80
                this.dir = -PI / 6 + Math.abs(this.dir * .1);
                console.log('4');
            } else if (puckY > paddleY + (0.3 * p.h) && puckY <= paddleY + p.h / 2 + 3) { //81-100
                this.dir = -PI / 3 + Math.abs(this.dir * .1);
                console.log('bottom');
            }
            if (this.dir <= -1.308)
                this.dir = -1.308;
            if (this.dir >= 1.308)
                this.dir = 1.308;
            if (getDifficulty() == 2)
                p.h = p.h * 0.97;
            else if (getDifficulty() == 1)
                p.h = p.h * 0.98;
            else if (getDifficulty() == 0)
                p.h = p.h * 0.99;
        } else {
            if (puckY >= paddleY - 53 && puckY <= paddleY - 30) { //0-20
                this.dir = 2 * PI / 3 - Math.abs(this.dir * .05);
            } else if (puckY > paddleY - 30 && puckY <= paddleY - 10) { //21-40
                this.dir = 5 * PI / 6 - Math.abs(this.dir * .1);
            } else if (puckY > paddleY - 10 && puckY <= paddleY + 10) { //41-60
                this.dir = PI + this.dir * -.1;
            } else if (puckY > paddleY + 10 && puckY <= paddleY + 30) { //61-80
                this.dir = 7 * PI / 6 + Math.abs(this.dir * .1);;
            } else if (puckY > paddleY + 30 && puckY <= paddleY + 53) { //81-100
                this.dir = 4 * PI / 3 + Math.abs(this.dir * .1);
            }
            if (this.dir <= PI - 1.308) {
                this.dir = PI - 1.308;
                console.log('hi');
            }
            if (this.dir >= PI + 1.308) {
                this.dir = 1.308;
                console.log('hi');
            }
        }
        this.xspeed += .4;
        this.yspeed -= .4;

    }

    this.isTouching = function(p) {
        if (p === player) {
            if (this.x - this.r <= p.x + p.w / 2 && this.y + this.r <= p.y + p.h / 2 + 15 && this.y - this.r >= p.y - p.h / 2 - 15) {
                this.direction(this.y, p.y, p, p.h);
                numPlayerHits++;
            }
        }
        if (p === computer) {
            if (this.x + this.r >= p.x - p.w / 2 && this.y + this.r <= p.y + p.h / 2 + 15 && this.y - this.r >= p.y - p.h / 2 - 15) {
                this.direction(this.y, p.y, p.h);
                numCompHits++;
            }
        }
    }
}
