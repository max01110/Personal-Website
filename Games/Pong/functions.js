class Ball {
  constructor(speed) {
    this.y = height/2;
    this.x = width/2;
    this.left = true;
    this.right = false;
    this.up = true;
    this.down = false;
    this.ballSpeed = speed;

  }
  drawBall() { //draws the ball
    color(255);
    noStroke();
    ellipse(this.x, this.y, 30);
  }
  checkBorder() { //checks if ball has bounced on one of the boards
    if (this.x <= 30) { //if bounced on left board, reverse direction
      this.left = false;
      this.right = true;
      bounce++;
    } else if (this.x >= width - 30) { //if bounced on right boad, reverse direction
      this.right = false;
      this.left = true;
      bounce++;0
    }

    if (this.left===true) {
      return "l"; //return current direction of ball (left)
    } else if (this.right===true) {
      return "r"; //return current direction of ball (right)
    }
  }
  borderCollide() { //checks ifball bounces on top and bottom edges
    if (this.y >= height - 15) { //if bounce on bottom, reverse direction
      this.up = true;
      this.down = false;
    } else if (this.y <= 15) { //if bounce on bottom, reverse direction
      this.down = true;
      this.up = false;
    }
    if (this.up===true) {
      return "u"; //return current direction of ball (up)
    } else if (this.down===true) {
      return "d"; //return current direction of ball (down)
    }
  }


  move (directionx, directiony) { //given ball directions, move ball accordingly
    if (directionx === "l") { //if "l" move ball left
      this.x -= this.ballSpeed;
    } else if (directionx === "r") { //if "r" move ball right
      this.x += this.ballSpeed;
    }
    if (directiony === "u") { //if "u" move ball up
      this.y -= this.ballSpeed;
    } else if (directiony === "d") { //if "d" move ball down
      this.y += this.ballSpeed;
    }

  }

  ballCollision(boardY, enemyBoardY, boardLength) {
    // 0 --> keep playing
    // 1 --> failed to bounce off player 1
    // 2 --> failed to bounce off player 2
    //player 1 bounce check
    if (this.x <= 30) {
      if (this.y <= boardY || this.y >= boardY + boardLength) {
         return 1;
      } else {
        return 0;
      }
    } else {
    //player 2 bounce check
      if (this.x >= width - 30) {
        if (this.y <= enemyBoardY || this.y >= enemyBoardY + boardLength) {
           return 2;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }
  }
}

class Board {
  constructor () {
    this.y = 10;
  }

  drawBoard(enemy) { //draws boards
    if (enemy) {
      rect(width-30, this.y, 15, 120);
    } else {
      rect(15, this.y, 15, 120);
    }
  }
  moveCheck() { //checks that board is not going off canvas
    if (this.y <= 0) {
      this.y = 0
    }
    if (this.y >= height - 120) {
      this.y = height - 120;
  }
}

}

//Functions

function drawScore() {
  color(255);
  textSize(50);
  text(player1S, width/4, 100);
  text(player2S, width/2 + (width/4), 100);

}
