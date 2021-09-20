function Grid(size, width, height){
    this.size = size;
    this.grids = []; // length n
    this.edges = []; // length n
    this.wnd_width = width;
    this.wnd_height = height;

    this.init = function(){
        var stepX = this.wnd_width / this.size;
        var stepY = this.wnd_height / this.size;
        for(var i = 0; i<this.size; i++){
            for(var j = 0; j<this.size; j++){
                var edges = [];

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

                this.edges.push(edges);
            }
        }
    }
    this.init();

    this.in_grid = function(edges, pos){    // FIXME: intersection between grids
        if (pos.x > edges[0].x && pos.x < edges[2].x &&
            pos.y > edges[0].y && pos.y < edges[2].y){
                return true;
            }
        return false;
    }
    this.get_grid = function(pos, r){       // TODO: better "edge" points (polar coordinates)
        p1 = new Vector2D(pos.x, pos.y - r);
        p2 = new Vector2D(pos.x + r, pos.y);
        p3 = new Vector2D(pos.x, pos.y + r);
        p4 = new Vector2D(pos.x - r, pos.y);
        points = [p1, p2, p3, p4];

        grids_idx = [];

        for(var i = 0; i<this.edges.length; i++){
            var edges = this.edges[i];

            for(var j = 0; j<points.length; j++){
                if (points[j].x > edges[0].x && points[j].x < edges[2].x &&
                    points[j].y > edges[0].y && points[j].y < edges[2].y){
                        grids_idx.push(i);
                }
            }
        }
        return grids_idx;
    }
    this.add_objects = function(objs){
        for(var i = 0; i<objs.length; i++){
            var idx = this.get_grid(objs[i].pos, objs[i].r);
            for(var j = 0; j<idx.length; j++){
                this.grids[idx[j]].push(objs[i]);
            }
        }
    }
    this.update_objs = function(objs){
        this.grids = Array.apply(null, Array(this.edges.length)).map(c => []); // TODO: hash table
        this.add_objects(objs);
    }
}