class player {
    constructor(x,y,width,height) {
      var options = {
          isStatic: false,
          density:1.5
      }
      this.body = Bodies.rectangle(x,y,width,height,options);
      this.width = width;
      this.image = loadImage("images/girl.png");

      this.height = height;
      this.body.label = 'player';

      World.add(world, this.body);
    }
    display(){
   // var pos =this.body.position;
      this.body.position.x = mouseX;
      push();
      translate(this.body.position.x, this.body.position.y);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
      pop();
        
    }

  };