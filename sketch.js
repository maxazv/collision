// ---init
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
w = canvas.width;
h = canvas.height;

var c = canvas.getContext('2d');

pop = 10


// ---classes
function Particle(x, y, r){
    this.pos = Vector2D(x, y)

    this.vel = Vector2D(0, 0);
    this.acc = Vector2D(0, 0);
    this.m = randint(0.6, 1.2);

    this.r = r*this.m;

    this.marked = false;

    this.draw = function(){
        c.beginPath();
        c.strokeStyle = 'rgba(255, 255, 255, 0.75)';
        c.fillStyle = 'rgba(255, 255, 255, 0.75)';
        c.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI*2, false);
        c.stroke();
        c.fill();
        this.glow(47, 23, 0.4*this.r*0.025);
    }
    this.glow = function(steps, glow, size){
        for(var i = 0; i<steps; i++){
            c.beginPath();
            opacity = 0.75/(i*glow);
            rgb = "rgba(220, 190, 230, " + String(opacity) + ")";
            c.fillStyle = rgb;
            c.arc(this.pos.x, this.pos.y, this.r*(i*size), 0, Math.PI*2, false);
            c.fill();
        }
    }

    this.apply_force = function(force){
        force.div(this.m)
        this.acc.add(force);
    }
    this.update = function(){
        this.vel.add(this.acc);
        this.pos.add(vel);

        this.acc.mult(0);
    }

    this.edge = function(){
        if(this.pos.x+this.r > w){
            this.pos.x = w - this.r;
            this.vel.x.mult(-1);
            return true;
        }
        if(this.pos.x-this.r < 0){
            this.pos.x = this.r;
            this.vel.x.mult(-1);
            return true;
        }
        if(this.pos.y+this.r > h){
            this.pos.y = h - this.r;
            this.vel.y.mult(-1);
            return true;
        }
        if(this.pos.y-this.r < 0){
            this.pos.y = this.r;
            this.vel.y.mult(-1);
            return true;
        }
        return false;
    }
}


// ---funcs
function inv_vec(v1, v2){
    inv = Vector2D.sub(v2, v1);

    return ;
}
function collision_simple(objs, j){
    for(var i = 0; i<objs.length; i++){
        if(i == j || this.marked){ continue; }

        radsum = objs[i].r + objs[j].r;
        if(objs[i].pos.dist(objs[j].pos) <= radsum){

            aoc = Vector2D.sub(objs[j].pos, objs[i].pos);
            repell_force = 0.1;
            aoc.mult(repell_force);
            objs[j].apply_force(inv_aoc)
            aoc.mult(-1);

            objs[i].apply_force(inv_aoc)

            objs[j].marked = true;
        }
    }
}
function randint(min, max) {
    return Math.random() * (max - min) + min;
}


// ---declare
var particles = []
for(var i = 0; i<pop; i++){
    var x = Math.random()*(w-40);
    var y = Math.random()*(h-40);
    particles.push(new Particle(x, y, 20));
}
var emission = [];
em_r = 2;
em_count = 4;

// ---animate
function animate(){
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(8, 4, 18, 0.4)'
    c.fillRect(0, 0, w, h)

    for(var i = 0; i<particles.length; i++){
        grav = [0, 0.1]
        particles[i].apply_force(grav)
        particles[i].update();
        if(particles[i].edge()){
            vel = particles[i].vel
            friction_force = -1
            friction = vel.normalise();

            friction.mult(friction_force);
            particles[i].apply_force(friction)
        }
        particles[i].draw();
        collision_simple(particles, i);
    }
}

animate()