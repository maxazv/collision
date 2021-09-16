// ---init
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
w = canvas.width;
h = canvas.height;
var c = canvas.getContext('2d');

// ---classes

function Particle(x, y, r){
    this.pos = [x, y]

    this.vel = [2, 0];
    this.acc = [0, 0];

    this.r = r;

    this.draw = function(){
        c.beginPath();
        c.arc(this.pos[0], this.pos[1], this.r, 0, Math.PI*2, false);
        c.stroke();
    }

    this.update = function(){
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
    }

    this.edge = function(){
        if(this.pos[0]+this.r > w){
            this.vel[0] *= -1;
            return;
        }
        if(this.pos[0]-this.r < 0){
            this.vel[0] *= -1;
            return;
        }
        if(this.pos[1]+this.r > w){
            this.vel[1] *= -1;
            return;
        }
        if(this.pos[1]-this.r < 0){
            this.vel[1] *= -1;
            return;
        }
    }
}

// ---declare

var particles = []
for(var i = 0; i<10; i++){
    var x = Math.random()*w;
    var y = Math.random()*h;
    particles.push(new Particle(x, y, 20));
}


// ---funcs



// ---animate

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, w, h)

    for(var i = 0; i<particles.length; i++){
        particles[i].draw();
        particles[i].update();
        particles[i].edge();
    }
}

animate()