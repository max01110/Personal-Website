var player1S = 0;
var player2S = 0;
var bounce = 0;
var boardSpeed = 6;


function setup() {
	createCanvas(900, 600);
	background(50);
	strokeWeight(2);
	stroke(150)
	line(width/2, 0, width/2, height)
	ball = new Ball(5); //ball
	board = new Board(); //Player board
	enemyBoard = new Board() //Computer board


}
function draw() {
	background(50);
	strokeWeight(2);
	stroke(150)
	line(width/2, 0, width/2, height)
	drawScore(); //show scores
	if (ball.ballCollision(board.y, enemyBoard.y, 120) === 0) { //if ball has bounced off properly off each board, keep playing
		ball.drawBall();
		board.drawBoard(false); //draw board of player
		board.moveCheck(); //make sure board doesnt go off canvas
		enemyBoard.drawBoard(true); //draw enemy board
		enemyBoard.y = ball.y - 60 //match the ball's y coordinates to the computer's board (Cheating ;))
		enemyBoard.moveCheck(); //make sure board doesnt go off canvas
		ball.move(ball.checkBorder(), ball.borderCollide()) //move ball (add or substract to x, and y coordinates)

		if (bounce==5) { //level check --> each 5 bounces, make game faster
			ball.ballSpeed++;
			boardSpeed ++;
			bounce = 0;
		}
	} else if (ball.ballCollision(board.y, enemyBoard.y, 120) === 1) { //if player was not able to bounce the ball
		player2S += 1 //add point to enemy
		//Reset Game
		ball.x = width/2;
		ball.y = height/2;
		ball.ballSpeed = 5;
		boardSpeed = 6;

	} else {
		player1S += 1 //add point to enemy (computer) (impossible)
		//Reset Game
		ball.x = width/2;
		ball.y = height/2;
		ball.ballSpeed = 5;
		boardSpeed = 6;

	}


	if (keyIsDown(38)) { //when up key is pressed, move up
		board.y -= boardSpeed;
	}
	if (keyIsDown(40)) { //when down key is pressed, move down
		board.y += boardSpeed;
	}


}
