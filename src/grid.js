function Grid(size, width, height){
    this.size = size;
    this.grids = []; // [[edges], content...]
    this.wnd_width = width;
    this.wnd_height = height;

    this.init = function(){
        var stepX = this.wnd_width / this.size;
        var stepY = this.wnd_height / this.size;
        for(var i = 0; i<this.size; i++){
            for(var j = 0; j<this.size; j++){
                var grid = [];

                var a = stepX/2;
                var b = stepY/2;
                var ctrX = stepX * (i+1) - a;
                var ctrY = stepY * (j+1) - b;
                
                edges = [
                    new Vector2D(ctrX-a, ctrY-b),
                    new Vector2D(ctrX+a, ctrY-b),
                    new Vector2D(ctrX+a, ctrY+b),
                    new Vector2D(ctrX-a, ctrY+b)
                ];
                grid.push(edges);
                this.grids.push(grid);
            }
        }
    }
    this.init();

    this.in_grid = function(edges, pos){
        if (pos.x > edges[0].x && pos.x < edges[2].x &&
            pos.y > edges[0].y && pos.y < edges[2].y){
                return true;
            }
        return false;
    }
    this.get_grid = function(pos){
        for(var i = 0; i<this.grids.length; i++){

            var edges = this.grids[i][0];
            if(this.in_grid(edges, pos)){
                return i;
            }
        }
    }
    this.add_objects = function(objs){
        for(var i = 0; i<objs.length; i++){
            var idx = this.get_grid(objs[i].pos);
            this.grids[idx].push(objs[i]);
        }
    }
    this.update_objs = function(objs){
        this.reset();
        this.add_objects(objs);
    }
    this.reset = function(){
        for(var i = 0; i<this.grids.length; i++){
            this.grids[i].splice(1, this.grids[i].length);
        }
    }
}