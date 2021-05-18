

class Stone{
    constructor(x, y, r) {
        var options = {
          restitution: 0.9,
          frictionAir : 0.1,
          density: 1
        }
        x += random(-300, 600);
        this.body = Bodies.circle(x, y, r, options);
        this.r = r;
        this.body.label = "stone";
    
        World.add(world, this.body);
      }
      
      display() {
          
        fill("green");
        var pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        ellipseMode(RADIUS)
        ellipse(0, 0, this.r);
        pop();
      }
    }