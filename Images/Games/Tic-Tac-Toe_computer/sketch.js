let grid = [['', '', ''],
			     ['', '', ''],  //2D array used to represent game
			     ['', '', '']]
let height = 600;
let width = 600;
let horizontalDiv = width/3;
let verticalDiv = height/3;
let player = true;

function setup() {
  createCanvas(600, 600);
  background(220);
}

function draw() {
  drawLines(); //Drawing of lines for grid
  drawGame(); //Drawing of grid (Os and Xs)
	//Check if O or X won, or it Tie
  if (checkWinner()=="X") { //this is impossible ;)
    isX();
		pressR();
  } else if (checkWinner()=="O") {
    isO();
		pressR();
		player = false;
  } else if (checkWinner()=="tie") {
    isTie();
		pressR();
  } else {
    if (player==true) {
    } else { //if not turn of player, then turn for computer to play
      bestMove(); //find best possible move with minimax algoritm
      player = true;
    }
	}
}

function mousePressed() {
  if (player==true) { //if mousepressed and turn of player
		pos = mouseCoor();
		console.log("mouse " + pos);
		if (pos!=undefined) {
			if (grid[pos.xCoor][pos.yCoor] == "") { //check that position is empty
				grid[pos.xCoor][pos.yCoor] = "X";
				player = false; //AI's turn
			} else {
				console.log("Invalid");
			}
		}
		}
	}


function keyPressed() {
  if (keyCode === 82) {
		console.log('test')
		grid = [['', '', ''],
					['', '', ''],  //reset grid if "R" is pressd (restart game)
					['', '', '']]
	background(220);
		}
}
