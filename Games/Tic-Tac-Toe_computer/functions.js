

//Drawing functions------------------------
function drawGame() { //Function that draws the grid on the canvas
   noStroke();
	let textSIZE = width/5;
	fill(0);
	for (let i=0; i<3;i++) { //Draws grid
	  for (let j=0;j<3;j++) {
		 let x = j*(width/ (width/200));
		 let y = i*(height/ (width/200));
		 textSize(textSIZE);
		 spot = grid[i][j];
		 text(spot, (x+width/2)-260, (y+height/2)-150);
	  	}
	}
}

function drawLines() { //Function that draws lines
	fill(0);
	stroke(5);
	strokeWeight(5);
	//Vertical Lines
	line(horizontalDiv, 0, horizontalDiv, height);
	line(horizontalDiv*2, 0, horizontalDiv*2, height);
	//Horizontal Lines
	line(0, verticalDiv, width, verticalDiv);
	line(0*2, verticalDiv*2, width*2, verticalDiv*2);
  }


function isTie() {
	background(255, 255, 255, 110);
  text("Tie", 200, 380);
}
function isO() {
	background(255, 255, 255, 110);
  textSize(50);
  text("O Wins (Computer)", 75, 330);
}
function isX() {
	background(255, 255, 255, 110);
  textSize(80);
  text("X Wins (Impossible)", 100, 380);

}

function pressR() {
  textSize(50);
  text('Press "r" to restart', 100, 460);

}

//Mechanics Functions-----------------------------
function equals(a, b, c) {
	return (a==b && b==c && a != "");
}

function checkWinner() { //checks grid for winners, ties, or none
	let winner = null;
	let availableSpace = 0;

	//Check available space
	for (let q=0; q<3; q++) {
		for (let w=0; w<3; w++) {
			if (grid[q][w]=="") {
				availableSpace+=1;
			}
		}
	}
	//Horizontal:
	for (let a=0; a<3; a++) {
		if (equals(grid[a][0],grid[a][1],grid[a][2])) {
			winner = grid[a][0];
		}
	}

	//Vertical
	for (let b=0; b<3; b++) {
		if (equals(grid[0][b],grid[1][b],grid[2][b])) {
			winner = grid[0][b];
		}
	}

	//Diagonal
	if (equals(grid[0][0],grid[1][1],grid[2][2])) {
		winner = grid[0][0];
	}

	if (equals(grid[2][0],grid[1][1],grid[0][2])) {
		winner = grid[2][0];
	}

	if (winner == null && availableSpace==0) {
		return 'tie';
	} else {
		return winner;
		}
	}

  function mouseCoor() { //checks mouseX and mouseY to find out where player clicked --> returns coordinates for grid
  	if (mouseX > 0 && mouseX < horizontalDiv && mouseY > 0 && mouseY < verticalDiv) {
  		return {
  			xCoor: 0,
  			yCoor: 0
  		}
  	} else if (mouseX > horizontalDiv && mouseX < horizontalDiv*2 && mouseY > 0 && mouseY < verticalDiv) {
  		return{
  			xCoor: 0,
  			yCoor: 1
  		}
  	} else if (mouseX > horizontalDiv*2 && mouseX < width && mouseY > 0 && mouseY < verticalDiv) {
  		return{
  			xCoor: 0,
  			yCoor: 2
  		}
  	} else if (mouseX > 0 && mouseX < horizontalDiv && mouseY > verticalDiv && mouseY < verticalDiv*2) {
  		return{
  			xCoor: 1,
  			yCoor: 0
  		}
  	} else if (mouseX > horizontalDiv && mouseX < horizontalDiv*2 && mouseY > verticalDiv && mouseY < verticalDiv*2) {
  		return{
  			xCoor: 1,
  			yCoor: 1
  		}
  	} else if (mouseX > horizontalDiv*2 && mouseX < width && mouseY > verticalDiv && mouseY < verticalDiv*2) {
  		return{
  			xCoor: 1,
  			yCoor: 2
  		}
  	} else if (mouseX > 0 && mouseX < horizontalDiv && mouseY > verticalDiv*2 && mouseY < height) {
  		return{
  			xCoor: 2,
  			yCoor: 0
  		}
  	} else if (mouseX > horizontalDiv && mouseX < horizontalDiv*2 && mouseY > verticalDiv*2 && mouseY < height) {
  		return{
  			xCoor: 2,
  			yCoor: 1
  		}
  	} else if (mouseX > horizontalDiv*2 && mouseX < width && mouseY > verticalDiv*2 && mouseY < height) {
  		return{
  			xCoor: 2,
  			yCoor: 2
  		}
  	}
}


function bestMove() { //Finds best move for computer to play
  let bestScore = -Infinity;
  let move;
  for (let i =0; i<3; i++) { //loop through each empty slots in grid
    for (let y=0; y<3; y++) {
      if (grid[i][y] == "") {
        grid[i][y] = "O";
        let score = minimax(grid, 0, false)
        grid[i][y] = ""
        if (score > bestScore) { //take best score (move)
          bestScore = score;
          move = {i, y};
        }
      }
    }
  }
  grid[move.i][move.y] = "O"; //place "O" in grid
}

let scores = {
  X: -1,
  O: 1,
  tie: 0
};

function minimax(grid, depth, isMaximizing) { //recursive minimax algoritm
  let result = checkWinner();
  if (result != null) { //base case --> if winner, or tie, stop
    return scores[result];
  }
  if (isMaximizing) { //if maximizing, return max score
    let bestScore = -Infinity;
    //Loop though each spots on grid and call minimax accordingly in order to find best move
    for (let i =0; i<3; i++) {
      for (let y=0; y<3; y++) {
        if (grid[i][y] == "") { //if valid put 'O' there
          grid[i][y] = "O"
          let score = minimax(grid, depth+1, false); //call minimax recursively with new grid
          grid[i][y] = ""; //undo
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else { //if minimizing, return minimum score
    let bestScore = Infinity;
    //Loop though each spots on grid and call minimax accordingly in order to find best move
    for (let i =0; i<3; i++) {
      for (let y=0; y<3; y++) {
        if (grid[i][y] == "") { //if valid put 'x' there
          grid[i][y] = "X"
          let score = minimax(grid, depth+1, true); //call minimax recursively with new grid
          grid[i][y] = ""; //undo
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
