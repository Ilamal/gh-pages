import System.IO;

var points;
var bird;
var pipes = [];
var millis;
function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
  points = 0;
  millis = getMilliseconds();
}

function draw() {
  background(0);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT!!  ");
	  points-=10;
	  document.getElementById("points").innerHTML = "Pisteesi : "+points;
		console.log("pisteUp");
    }


    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }


  }

  bird.update();
  bird.show();

  if (frameCount % 100 == 0) {
    pipes.push(new Pipe());
  }


}

function keyPressed() {
  if (key == ' ') {
    bird.up();
	points+=2;
	document.getElementById("points").innerHTML = "Pisteesi : "+points;
	console.log("pisteUp");
	if(getMilliseconds()-millis >= 10000)
		SavePoints();
		millis = getMilliseconds;
    //console.log("SPACE");
  }
}
function SavePoints(){
	sw = new StreamWriter("Pisteet.txt");
	sw.write(sketch.points);
	sw.Close();
}
//Contact GitHub API Training Shop Blog About
//© 2017 GitHub, Inc. Terms Privacy Security Status Help
