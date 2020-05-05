function lose() {
  fill(0);
  rect(0, 0, width, height);
  fill(255, 0, 0);
  textSize(40);
  text("Game Over!", width/2-115, height/2-40);
  text("Score: " + score, width/2-75, height/2+30);
  fill(0, 255, 0)
  textSize(20);
  text("HIGHSCORE: " + highScore, 20, 40);
  fill(255);
  textSize(25);
  text("Click anywhere to restart", width/2-130, height/2+100);
  bird.y = 250; 
  
}