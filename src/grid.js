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
                    new Vector2D(ctrX-a, ctrY-a),
                    new Vector2D(ctrX+a, ctrY-a),
                    new Vector2D(ctrX+a, ctrY+a),
                    new Vector2D(ctrX-a, ctrY+a)
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
            idx = this.get_grid(objs[i].pos);
            this.grids[idx].push(this.objs[i]);
        }
    }
}