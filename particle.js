class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = p5.Vector.random2D().mult(random(2, 6));
      this.acceleration = createVector(0, 0);
      this.mass = random(2, 6);
      this.r = sqrt(this.mass) * 10;
    }
  
    applyForce(force) {
      let f = force.copy().div(this.mass);
      this.acceleration.add(f);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    collide(other) {
      let impactVector = p5.Vector.sub(other.position, this.position);
      let distance = impactVector.mag();
      
      if (distance < this.r + other.r) {
        this.resolveCollision(other, impactVector, distance);
      }
    }
  
    resolveCollision(other, impactVector, distance) {
      let overlap = distance - (this.r + other.r);
      let direction = impactVector.copy().setMag(overlap * 0.5);
  
      this.position.add(direction);
      other.position.sub(direction);
  
      let mSum = this.mass + other.mass;
      let vDiff = p5.Vector.sub(other.velocity, this.velocity);
  
      let num = vDiff.dot(impactVector);
      let den = mSum * distance * distance;
      
      let deltaVA = impactVector.copy().mult(2 * other.mass * num / den);
      let deltaVB = impactVector.copy().mult(-2 * this.mass * num / den);
      
      this.velocity.add(deltaVA);
      other.velocity.add(deltaVB);
    }
  
    edges() {
      if (this.position.x > width - this.r) {
        this.position.x = width - this.r;
        this.velocity.x *= -1;
      } else if (this.position.x < this.r) {
        this.position.x = this.r;
        this.velocity.x *= -1;
      }
  
      if (this.position.y > height - this.r) {
        this.position.y = height - this.r;
        this.velocity.y *= -1;
      } else if (this.position.y < this.r) {
        this.position.y = this.r;
        this.velocity.y *= -1;
      }
    }
  
    show() {
      stroke(0);
      strokeWeight(2);
      fill(127);
      circle(this.position.x, this.position.y, this.r * 2);
    }
  }