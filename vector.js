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
        sqr_sum = this.x*this.x + this.y*this.y;
        return Math.sqrt(sqr_sum);
    }
    dist(vector){
        dir = vector.sub(this);
        return dir.mag();
    }
    normalise(){
        magn = this.mag();
        return Vector2D(this.x/magn, this.y/magn);
    }

    static sub(v1, v2){
        vec = Vector2D(v1.x-v2.x, v1.y-v2.y);
    }
}