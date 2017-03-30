var rows,cols;
var w = 20;
var cells = [];

var current;
var stack = [];

function setup() {
    
    createCanvas(1000,1000);  //x and y must be same
    background(51);
 //   frameRate(5);
    
    rows = floor(width/w);
    cols = floor(height/w);
    
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            cells.push(new cell(j,i));
        }
    }   
    current = cells[0];
    current.visited = true;
}

function draw() {
   //console.log(current);
    var neigh = current.checkNeigh();
    if (neigh){
        
        //step 1
        newCell = neigh;
        
        //step 2
        stack.push(newCell);
        
        //step 3
        current.removeWall(newCell);
        
        //step 4
        current = newCell;
        current.visited = true;
    }
    else {
        //backtrack
        if(stack.length>0)
            current = stack.pop();
    }
    for(var i=0;i<cells.length;i++){
        cells[i].show();
    }
    if(stack.length>0)
        current.highLight();
}

function cell(i,j){
    this.visited = false;
    this.i = i;
    this.j = j;
    
    var x = this.i * w;
    var y = this.j * w;   
    
    this.walls = [true,true,true,true];
    this.show = function(){
    stroke(255);
    
    if(this.walls[0]){ //top
        line(x,y,x+w,y);
    }
    if(this.walls[1]){ //right
        line(x+w,y,x+w,y+w);
    }
    if(this.walls[2]){ //bottom
        line(x+w,y+w,x,y+w);
    }
    if(this.walls[3]){ //left
        line(x,y+w,x,y);
    }
    if(this.visited){
        noStroke();
        fill(255,0,200,50);
        rect(x,y,w,w);
    }
        
        
    }
    this.removeWall = function(other){
        
        if(this.i-other.i == 1){
            //vasemmalla
            this.walls[3] = false;
            other.walls[1] = false;
        }
        if(this.i-other.i == -1){
            //oikealla
            this.walls[1] = false;
            other.walls[3] = false;
        }
        if(this.j-other.j == 1){
            //ylhäällä
            this.walls[0] = false;
            other.walls[2] = false;
        }
        if(this.j-other.j == -1){
            //alhaalla
            this.walls[2] = false;
            other.walls[0] = false;
        }       
    }
    this.checkNeigh = function(){
        var neigh = [];
        var top = cells[(getIndex(this.i,this.j-1))];
        var right = cells[(getIndex(this.i+1,this.j))];
        var bottom = cells[(getIndex(this.i,this.j+1))];
        var left = cells[(getIndex(this.i-1,this.j))];
        
        if(top && !top.visited){
            neigh.push(top);
        }
        if(right && !right.visited){
            neigh.push(right);
        }
        if(bottom && !bottom.visited){
            neigh.push(bottom);
        }
        if(left && !left.visited){
            neigh.push(left);
        }
        if(neigh.length>0){
            return neigh[floor(random(0,neigh.length))];
        }else
            return undefined;
        
    }
    this.highLight = function(){
        noStroke();
        fill(255,25,100);
        rect(x,y,w,w);
    }
}
function getIndex(i,j){
        if(i < 0 || j<0 || i>cols-1 || j> rows-1)
            return -1;
        else
            return i+j *cols;
    }



