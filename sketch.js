const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Events = Matter.Events;

var engine, world;
var particles=[],stones=[];
var player1,ground;
var playerLife = 0;
var backgroundImg,backgroundImg2;
var gameState = "instructions";
var start;
//var rocksound;

function preload() {
  backgroundImg = loadImage("images/bg1.jpg");
  ins_image= loadImage("images/ins_img.jpg")
  //backgroundImg2 = loadImage("images/bg2.jpg");

  //rocksound=loadSound("sounds/rock.wav");
}

function setup() {

    createCanvas(1200, 400);
    engine = Engine.create();
    world = engine.world;

    player1 = new player(300, height - 40, 100, 100)
    ground = new Ground(600, height,1200,5);
    start = createSprite(600,180,100,20);
    start.addImage(ins_image)
    start.scale=0.3
    restart = createSprite(400,200,20,20);
   restart.visible=false;
  
  }
  function draw() {
    background(0);
    Engine.update(engine);
   
   if(gameState==="instructions" && mousePressedOver(start)){
      gameState="play";
   }

    
    if (gameState === "play") {
      imageMode(CENTER);
      image(backgroundImg, 600, 200, 1200, 400);

      textSize(30)
      fill("white")
      text("LifeTime  " + playerLife, width - 250, 50);
      start.visible = false;



    Events.on(engine, 'collisionStart', collision);

    playerLife = Math.round(frameCount / 10);

//to spawn praticles
    if (frameCount % 15 == 0) {
        newParticle();
      }
      for (var i = 0; i < particles.length; i++) {
        particles[i].display();
        if(particles[i].body.position.y>370){
          World.remove(world, particles[i].body);
              particles.splice(i, 1);
              i--;
            
        }
      }
// to spawn stones
      if (frameCount % 100 == 0) {
        newStone();
      }
      for (var i = 0; i < stones.length; i++) {
        stones[i].display();
        if(stones[i].body.position.y>370){
          World.remove(world, stones[i].body);
              stones.splice(i, 1);
              i--;
        }
      }
    
    if (player1.body.position.y > 430) {
      gameState = "end";
    }
    ground.display();
    player1.display();
  
}
else if (gameState === "end") {
  textSize(35)
  fill("red");
  text("SURVIVED FOR: " + playerLife + " seconds", width - 800, 250);

  textSize(40)
  fill("red");
  text("GAME OVER", width - 700, 150);

}
   drawSprites();
   

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
   
