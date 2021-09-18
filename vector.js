function Vector2D(x, y){
    this.x = x;
    this.y = y;

    this.add = function(vector){
        this.x += vector.x;
        this.y += vector.y;
    }
    this.sub = function(vector){
        this.x -= vector.x;
        this.y -= vector.y;
    }
    this.mult = function(scalar){
        this.x *= scalar;
        this.y *= scalar;
    }
}