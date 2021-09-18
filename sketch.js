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
    this.pos = [x, y]

    this.vel = [2, 0];
    this.acc = [0, 0];
    this.m = randint(0.5, 1);

    this.r = r*this.m;

    this.marked = false;

    this.draw = function(){
        c.beginPath();
        c.arc(this.pos[0], this.pos[1], this.r, 0, Math.PI*2, false);
        c.stroke();
    }

    this.apply_force = function(force){
        this.acc[0] += force[0]/this.m;
        this.acc[1] += force[1]/this.m;
    }
    this.update = function(){
        this.vel[0] += this.acc[0];
        this.vel[1] += this.acc[1];
        this.acc[0] = 0;
        this.acc[1] = 0;

        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
    }

    this.edge = function(){
        if(this.pos[0]+this.r > w){
            this.pos[0] = w - this.r;
            this.vel[0] *= -1;
            return true;
        }
        if(this.pos[0]-this.r < 0){
            this.pos[0] = this.r;
            this.vel[0] *= -1;
            return true;
        }
        if(this.pos[1]+this.r > h){
            this.pos[1] = h - this.r;
            this.vel[1] *= -1;
            return true;
        }
        if(this.pos[1]-this.r < 0){
            this.pos[1] = this.r;
            this.vel[1] *= -1;
            return true;
        }
        return false;
    }
}


// ---funcs
function vec_mag(v){
    var sum = Math.pow(v[0], 2) + Math.pow(v[1], 2);
    return Math.sqrt(sum);
}
function normalise(v){
    mag = vec_mag(v);
    return [v[0]/mag, v[1]/mag]
}
function dist(v1, v2){
    dx = v1[0] - v2[0];
    dy = v1[1] - v2[1];
    var sum = Math.pow(dx, 2) + Math.pow(dy, 2);
    
    return Math.sqrt(sum);
}
function inv_vec(v1, v2){
    dx = v2[0] - v1[0];
    dy = v2[1] - v1[1];
    repell_force = 0.1;

    return [dx*repell_force, dy*repell_force];
}
function collision_simple(objs, j){
    for(var i = 0; i<objs.length; i++){
        if(i == j || this.marked){ continue; }

        radsum = objs[i].r + objs[j].r;
        if(dist(objs[i].pos, objs[j].pos) <= radsum){

            inv_aoc = inv_vec(objs[i].pos, objs[j].pos);
            objs[j].apply_force(inv_aoc)
            inv_aoc[0] *= -1
            inv_aoc[1] *= -1
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

// ---animate
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, w, h)

    for(var i = 0; i<particles.length; i++){
        grav = [0, 0.1]
        particles[i].apply_force(grav)
        particles[i].update();
        if(particles[i].edge()){
            vel = particles[i].vel
            friction_force = -1

            friction = normalise(vel)
            friction[0] *= friction_force
            friction[1] *= friction_force
            particles[i].apply_force(friction)
        }
        particles[i].draw();
        collision_simple(particles, i);
    }
}

animate()