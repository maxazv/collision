class Rope{
    constructor(p1, p2, len, k){
        this.p1 = p1;
        this.p2 = p2;
        this.len = len;

        this.k = k*0.001;
    }

    update(){
        var diff = Vector2D.sub(this.p2.pos, this.p1.pos);
        var exc = diff.mag();
        exc -= this.len;
        var f = -this.k * exc;

        diff = diff.normalise();;
        diff.mult(f);

        this.p2.apply_force(diff);
    }
    draw(){
        c.beginPath();
        c.moveTo(this.p1.pos.x, this.p1.pos.y);
        c.lineTo(this.p2.pos.x, this.p2.pos.y);
        c.stroke();
        this.p1.draw();
        this.p2.draw();
    }
}