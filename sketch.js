let particles = [];

function setup() {
  createCanvas(screen.width, screen.height);
  for(let i=0; i<10; i++){
    let x = random(width);
    let y = random(height);
    particles.push(new Particle(x,y));
  }
}

function draw() {
  background(255);

  for(let i = 0; i < particles.length; i++){
    for(let j = i+1; j < particles.length; j++){
      particles[i].collide(particles[j]);
    }
  }

  for(let particle of particles){
    particle.update();
    particle.edges();
    particle.show();
  }

}
