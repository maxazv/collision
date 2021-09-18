class Vector2D{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(vector){
        this.x += vector.x;
        this.y += vector.y;
    }
    sub(vector){
        this.x -= vector.x;
        this.y -= vector.y;
    }
    mult(scalar){
        this.x *= scalar;
        this.y *= scalar;
    }
    div(scalar){
        this.x /= scalar;
        this.y /= scalar;
    }
    mag(){
        var sqr_sum = this.x*this.x + this.y*this.y;
        return Math.sqrt(sqr_sum);
    }
    dist(vector){
        var dir = vector.sub(this);
        return dir.mag();
    }
    normalise(){
        var magn = this.mag();
        return new Vector2D(this.x/magn, this.y/magn);
    }

    static sub(v1, v2){
        return new Vector2D(v1.x-v2.x, v1.y-v2.y);
    }
    static dir(v1, v2){
        var dir = Vector2D.sub(v2, v1);
        return dir.mag();
    }
}