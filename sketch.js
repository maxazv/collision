// ---init
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;

var c = canvas.getContext('2d');

pop = 15;


// ---classes
function Particle(x, y, r){
    this.pos = new Vector2D(x, y)

    this.vel = new Vector2D(0, 0);
    this.acc = new Vector2D(0, 0);
    this.m = randint(0.6, 1.1);

    this.r = r*this.m;

    this.marked = false;

    this.draw = function(){
        c.beginPath();
        c.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        c.fillStyle = 'rgba(255, 255, 255, 0.7)';
        c.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI*2, false);
        c.stroke();
        c.fill();
        this.glow(47, 23, 0.09, this.r*0.005);
    }
    this.glow = function(steps, glow, gradient, size){
        for(var i = 0; i<steps; i++){
            l = (steps-i) * gradient

            c.beginPath();
            opacity = 0.7 / ((i/l) * glow);
            rgb = "rgba(220, 150, 230, " + String(opacity) + ")";

            c.fillStyle = rgb;
            c.arc(this.pos.x, this.pos.y, this.r*(i*size), 0, Math.PI*2, false);
            c.fill();
        }
    }

    this.apply_force = function(force){
        var f = Vector2D.div(force, this.m);
        this.acc.add(f);
    }
    this.update = function(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.mult(0);
    }

    this.edge = function(){
        if(this.pos.x+this.r > w){
            this.pos.x = w - this.r;
            this.vel.x *= -1;
            return true;
        }
        if(this.pos.x-this.r < 0){
            this.pos.x = this.r;
            this.vel.x *= -1;
            return true;
        }
        if(this.pos.y+this.r > h){
            this.pos.y = h - this.r;
            this.vel.y *= -1;
            return true;
        }
        if(this.pos.y-this.r < 0){
            this.pos.y = this.r;
            this.vel.y *= -1;
            return true;
        }
        return false;
    }
}


// ---funcs
function collision_simple(objs, j){
    for(var i = 0; i<objs.length; i++){
        if(i == j || this.marked){ continue; }

        radsum = objs[i].r + objs[j].r;
        if(Vector2D.dir(objs[i].pos, objs[j].pos) <= radsum){

            aoc = Vector2D.sub(objs[j].pos, objs[i].pos);
            repell_force = 0.1;

            aoc.mult(repell_force);
            objs[j].apply_force(aoc);

            aoc.mult(-1);
            objs[i].apply_force(aoc);

            objs[j].marked = true;
        }
    }
}
function randint(min, max){
    return Math.random() * (max - min) + min;
}
function gradient(steps, grad, rgba){
    loc = y / steps
    cop = rgba;
    for(var i = 0; i<steps; i++){
        s = steps-i;
        s = i
        current = []
        var startY = loc*i;
        var endY = loc*(i+1);
        current.push(String(rgba[0] * (s*grad)));
        current.push(String(rgba[1] * (s*grad)));
        current.push(String(rgba[2] * (s*grad)));
        color = 'rgba(' + current[0] + ', ' + current[1] + ', ' + current[2] + ', ' + 1 + ')';

        c.fillStyle = color;
        c.fillRect(0, startY, w, endY);
    }
}


// ---declare
var particles = []
for(var i = 0; i<pop; i++){
    var x = Math.random()*(w-40);
    var y = Math.random()*(h-40);
    particles.push(new Particle(x, y, 20));
}

grav = new Vector2D(0, 0.4)

canvas.addEventListener('mousedown', () => {
    for(var i = 0; i<particles.length; i++){
        acc = new Vector2D(randint(-2, 2), -30);
        particles[i].apply_force(acc);
        console.log('hi');
    }
});

// ---animate
function animate(){
    requestAnimationFrame(animate);
    c.beginPath();
    //rgb = [8, 4, 15];
    //gradient(100, 0.03, rgb);
    c.fillStyle = 'rgba(8, 4, 18, 0.4)'
    c.fillRect(0, 0, w, h)

    for(var i = 0; i<particles.length; i++){
        particles[i].apply_force(grav)
        particles[i].update();

        if(particles[i].edge()){
            friction_force = -1
            friction = particles[i].vel.normalise();

            friction.mult(friction_force);
            particles[i].apply_force(friction)
        }
        particles[i].draw();

        collision_simple(particles, i);
    }
}

animate()