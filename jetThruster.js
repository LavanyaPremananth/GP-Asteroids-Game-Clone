thrusters = [];
class jetThruster{
   constructor(){ 
       this.location = new createVector(width/2, height/2);
       this.r = 30;
       this.alpha = 255;
   }
    
    run(){
        this.draw();
        this.update();
    }
    
    //draws jet thrusters 
    draw(){
        drawThrust();
    }

  //  updates the location of the thrusters
    update(){
        this.location.x += random(-5, 5);
        this.location.y -= random(1, -10);
        this.alpha -= 7;
        this.r -= 1;
    }
    
    show(){
        noStroke();
        fill(255,69,0, this.alpha);
        ellipse(this.location.x, this.location.y, this.r);
    }
    
    finished(){
        return this.alpha < 0;
    }
}

function drawThrust(){
      for (let i = 0; i < 7; i++) {
    let b = new jetThruster();
    thrusters.push(b);
  }
  for (let i = thrusters.length-1; i >= 0; i--) {
    thrusters[i].update();
    thrusters[i].show();
    if (thrusters[i].finished()) {
      // remove this bubble
      thrusters.splice(i, 1); 
    }
  }
}