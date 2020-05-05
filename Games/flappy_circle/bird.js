function Bird() {
  this.y = height/2;
  this.x = 40;
  this.gravity = 0.2;
  this.velocity = 0.6;

  this.show = function () {
    fill(255);  
    ellipse(this.x, this.y, 30, 30);
    
    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0){
      this.y = 0;
      this.velocity = 0.1;
    }
  this.update = function() {
    this.velocity += this.gravity;
    this.y += this.velocity; 
    }
     
  this.up = function() { 
    this.velocity -= 5;
    this.y += this.velocity;  
    }
    

}
}