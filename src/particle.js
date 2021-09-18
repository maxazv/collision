function Particle(x, y){
    this.pos = new Vector2D(x, y)

    this.vel = new Vector2D(0, 0);
    this.acc = new Vector2D(0, 0);
    this.m = randint(0.6, 1.1);

    this.r = 12.5*this.m;

    this.marked = false;

    this.color = 'rgba(255, 255, 255, 0.7)';

    this.draw = function(){
        c.beginPath();
        c.strokeStyle = this.color;
        c.fillStyle = this.color;

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
        if(this.pos.x+this.r > _w){
            this.pos.x = _w - this.r;
            this.vel.x *= -1;
            return true;
        }
        if(this.pos.x-this.r < 0){
            this.pos.x = this.r;
            this.vel.x *= -1;
            return true;
        }
        if(this.pos.y+this.r > _h){
            this.pos.y = _h - this.r;
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