const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;

var engine, world;
var particles=[],stones=[];
var player1,ground;
var playerLife = 0;
var backgroundImg,backgroundImg2;
var gameState = "play";

//var rocksound;

function preload() {
  backgroundImg = loadImage("images/bg1.jpg");
  //backgroundImg2 = loadImage("images/bg2.jpg");

  //rocksound=loadSound("sounds/rock.wav");
}

function setup() {

    createCanvas(1200, 400);
    engine = Engine.create();
    world = engine.world;

    player1 = new player(300, height - 30, 100, 100)
    ground = new Ground(600, height, 1200, 5);
  
  }
  function draw() {
  
    Engine.update(engine);
    background(0);
    imageMode(CENTER);
    image(backgroundImg, 600, 200, 1200, 400);

    textSize(30)
    fill("white")
    text("LifeTime  " + playerLife, width - 250, 50);

    if (gameState === "play") {

    Events.on(engine, 'collisionStart', collision);

    playerLife = Math.round(frameCount / 10);
//to spawn praticles
    if (frameCount % 30 == 0) {
        newParticle();
      }
      for (var i = 0; i < particles.length; i++) {
        particles[i].display();
      }
// to spawn stones
      if (frameCount % 100 == 0) {
        newStone();
      }
      for (var i = 0; i < stones.length; i++) {
        stones[i].display();
      }
    
    if (player1.body.position.y > 450) {
      gameState = "end";
    }
  
}
else if (gameState === "end") {
  console.log("gameover");
  textSize(35)
  fill("yellow");
  text("SURVIVED FOR:  " + playerLife "points", width - 800, 250);

  textSize(40)
  fill("red");
  text("Game Over", width - 700, 150);

}
    ground.display();
    player1.display();
    
  }

    function newParticle() {
      var p = new Particle(600, 0, random(5, 10));
      particles.push(p);
      
    }

    function newStone() {
      var s = new Stone(600,0,random(5,10));
      stones.push(s);
    }

    function collision(event) {
      var pairs = event.pairs;
      for (var i = 0; i < pairs.length; i++) {
        var labelA = pairs[i].bodyA.label;
        var labelB = pairs[i].bodyB.label;
        if (labelA == 'particle' && labelB == 'player' || labelA == 'player' && labelB == 'particle' ) {
          //add audio file or change background image
          //rocksound.play();
          Matter.Body.setPosition(player1.body, { x: mouseX, y: player1.body.position.y + 0.05 });
         
        }
         if (labelA == 'stone' && labelB == 'player' || labelA == 'player' && labelB == 'stone' ) {
       
          Matter.Body.setPosition(player1.body, { x: mouseX, y: player1.body.position.y - 0.05 });

      }
      }
    }
