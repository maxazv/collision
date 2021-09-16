// ---init
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
w = canvas.width;
h = canvas.height;
var c = canvas.getContext('2d');

alpha = 10;


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

function Grid(size){
    this.size = size;
    this.grids = []; // [[edges], content...]

    this.init = function(){
        stepX = innerWidth/this.size;
        stepY = innerHeight/this.size;
        for(var i = 0; i<this.size; i++){
            for(var j = 0; j<this.size; j++){
                grid = []

                a = (stepX/2);
                ctrX = stepX*i - a;
                ctrY = stepY*j - a;
                
                edges = [
                    [ctrX-a, ctrY-a],
                    [ctrX+a, ctrY-a],
                    [ctrX+a, ctrY+a],
                    [ctrX-a, ctrY+a]
                ];

                grid.push(edges);
                this.grids.push(grid);
            }
        }
    }
    this.init();

    this.in_grid = function(edges, pos){
        if (pos[0] > edges[0][0] && pos[1] > edges[0][1] &&
            pos[0] < edges[1][0] && pos[1] > edges[1][1] &&
            pos[0] < edges[2][0] && pos[1] < edges[2][1] &&
            pos[0] > edges[3][0] && pos[1] < edges[3][1]){
                return true;
            }
        return false;
    }
    this.get_grid = function(pos){
        for(var i = 0; i<this.grids.length; i++){
            edges = this.grids[i][0]
            if(this.in_grid(edges, pos)){
                return i;
            }
        }
    }
    this.add_objects = function(objs){
        for(var i = 0; i<objs.length; i++){
            pos = objs[i].pos;
            idx = this.get_grid(pos);
            this.grids[idx].push(this.objs[i]);
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
function dist(v1, v2){
    dx = v1[0] - v2[0];
    dy = v1[1] - v2[1];
    var sum = Math.pow(dx, 2) + Math.pow(dy, 2);
    
    return Math.sqrt(sum);
}
function inv_vec(v1, v2){
    dx = v2[0] - v1[0];
    dy = v2[1] - v1[1];
    return [dx*-1, dy*-1];
}
function collision_simple(objs){
    for(var i = 0; i<objs.length; i++){
        for(var j = 0; j<objs.length; j++){
            if(i == j){ continue; }

            radsum = objs[i].r + objs[j].r;
            if(dist(objs[i].pos, objs[j].pos) <= radsum){

                inv_aoc = inv_vec(objs[i].pos, objs[j].pos);
                objs[i].acc = inv_aoc*alpha;
            }
        }
    }
}


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