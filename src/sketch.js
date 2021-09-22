var canvas = document.querySelector('canvas');

var scale = 600;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var _w = window.innerWidth;
var _h = window.innerHeight;

var c = canvas.getContext('2d');

var pop = 15;
var grid = new Grid(4, _w, _h);


// ---funcs
function collision_simple(objs, j){
    for(var i = 0; i<objs.length; i++){
        if(i == j){ continue; }

        radsum = objs[i].r + objs[j].r;
        if(Vector2D.colliding(objs[i].pos, objs[j].pos, radsum)){

            aoc = Vector2D.sub(objs[j].pos, objs[i].pos);
            repell_force = 0.1;

            aoc.mult(repell_force);
            objs[j].apply_force(aoc);

            aoc.mult(-1);
            objs[i].apply_force(aoc);
        }
    }
}
function collision_grids(){     // FIXME: particle can be on the edge of two grids
    for(var i = 0; i<grid.grids.length; i++){   // just add particle to all intersect. grids
        for(var j = 0; j<grid.grids[i].length; j++){

            var frst = grid.grids[i][j];
            for(var k = 0; k<grid.grids[i].length; k++){
                scnd = grid.grids[i][k];
                radsum = frst.r + scnd.r;
                if(Vector2D.colliding(frst.pos, scnd.pos, radsum)){

                    aoc = Vector2D.sub(scnd.pos, frst.pos);
                    repell_force = 0.001;

                    aoc.mult(repell_force);
                    scnd.apply_force(aoc);

                    aoc.mult(-1);
                    frst.apply_force(aoc);
                }
            }
        }
    }
}

function randint(min, max){
    return Math.random() * (max - min) + min;
}
function gradient(steps, grad, rgba){
    loc = y / steps;
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
        c.fillRect(0, startY, _w, endY);
    }
}


// ---declare
grav = new Vector2D(0, 0.35);
friction_force = -0.6;

var particles = []
for(var i = 0; i<pop; i++){
    var x = Math.random() * (_w-40);
    var y = Math.random() * (_h-40);
    particles.push(new Particle(x, y, 10));
}

var rope = new Rope(particles[0], particles[1], 25, 1.5);

//grid.update_objs(particles);


// ---events
canvas.addEventListener('dblclick', () => {
    for(var i = 0; i<particles.length; i++){
        acc = new Vector2D(randint(-2, 2), -30);
        particles[i].apply_force(acc);
        console.log('hi');
    }
});
canvas.addEventListener('mousedown', (event) => {
    mouse = new Vector2D(event.clientX, event.clientY);
    mouse_w = 10;

    g = 0.01;
    scalar = (Math.pow(10, 3.5));
    for(var i = 0; i<particles.length; i++){

        dir = Vector2D.sub(mouse, particles[i].pos);
        d = dir.mag();
        attract = (g * particles[i].m * mouse_w) / scalar*(d * d);

        dir = dir.normalise();
        dir.mult(attract);
        this.particles[i].apply_force(dir);
    }
});
/*
canvas.addEventListener('mousedown', (event) => {
    mouse = new Vector2D(event.clientX, event.clientY);
    min = 200;
    idx = -1;
    for(var i = 0; i<particles.length; i++){
        loc = particles[i].pos;
        d = Vector2D.dist(loc, mouse);

        if(d < min){
            min = d;
            idx = i;
        }
    }
    if(idx == -1){ return; }
    particles[idx].pos = mouse;
});
*/

// ---animate
function animate(){
    requestAnimationFrame(animate);
    c.beginPath();
    c.fillStyle = 'rgba(8, 4, 10, 0.4)'
    c.fillRect(0, 0, _w, _h)

    for(var i = 0; i<particles.length; i++){
        particles[i].apply_force(grav)
        particles[i].update();
        // rope
        particles[0].pos = new Vector2D(_w/2, 20);

        if(particles[i].edge()){
            friction = particles[i].vel.normalise();

            friction.mult(friction_force);
            particles[i].apply_force(friction)
        }
        particles[i].draw();

        collision_simple(particles, i);
    }
    rope.update();
    rope.draw();
    //collision_grids();
    //grid.update_objs(particles);
}

animate()