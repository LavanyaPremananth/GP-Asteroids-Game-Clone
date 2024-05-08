//AestroidGame

//For Further Development, I have added jets thursters that activate from the opposite side of movement. 

//Additionally, I have also implemented the score system that keeps track of the number of aestroids that the spaceship has hit. 


var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var game_score;
var spaceshipDestroyed;
var lives;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
    
  //initialise game_score
  game_score = 0;

  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
    
  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();
    
  drawGameScore();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//draw game score
function drawGameScore(){
    fill(255);
    rect(5,10,100,30);
    
    textSize(20);
    strokeWeight(50);
    fill(0);
    text("Score: " +game_score, 20, 35);
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(50);
  textAlign(CENTER);
  text("Game Over!You Lose", width/2, height/2);
  noLoop();
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i = 0; i < asteroids.locations.length; i++){
        var asteroidLoc = asteroids.locations[i];
        var asteroidDiam = asteroids.diams[i];
        if(isInside(asteroidLoc,asteroidDiam,spaceship.location,spaceship.size)){
            gameOver();
        }
    }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i = 0; i < asteroids.locations.length; i++){
        var asteroidLoc = asteroids.locations[i];
        var asteroidDiam = asteroids.diams[i];
        if(isInside(asteroidLoc,asteroidDiam,earthLoc,earthSize.y)){
            gameOver();
        }
    }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location,spaceship.size,earthLoc,earthSize.y)){
       gameOver();
    }
    
    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location,spaceship.size,atmosphereLoc,atmosphereSize.y)){
        spaceship.setNearEarth();
    }

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    var bullets = spaceship.bulletSys.bullets;
    for(var i= 0; i<bullets.length; i++){
        for(var j = 0; j < asteroids.locations.length; j++){
        var asteroidLoc = asteroids.locations[j];
        var asteroidDiam = asteroids.diams[j];
            if(isInside(asteroidLoc,asteroidDiam,bullets[i],spaceship.bulletSys.diam)){
                asteroids.destroy(j);
                //increment game score 
                game_score++;
            }
        }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var d = dist(locA.x, locA.y, locB.x, locB.y);
    var maxDist = sizeA/2 + sizeB/2;
    if(maxDist < d){
        return false;
    }else{
        return true;
    }
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}

