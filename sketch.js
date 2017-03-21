var d = new Date();
var n = d.getTime();
var points;
var bird;
var pipes = [];
var millis;
function setup() {
  createCanvas(400, 600);
  bird = new Bird();
  pipes.push(new Pipe());
  points = 0;
  millis = d.getTime();
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
	Leaderboards();

}

function keyPressed() {
  if (key == ' ' || key.keyCode == 13) {
    bird.up();
	points+=2;
	document.getElementById("points").innerHTML = "Pisteesi : "+points;
	console.log("pisteUp");
	if(d.getTime()-millis >= 10000)
		SavePoints();
		millis = d.getTime();
    //console.log("SPACE");
  }
}
function SavePoints(){
    ie_writeFile("Pisteet.txt", pisteet);
}
var ie_writeFile = function (fname, data) {
    var fso, fileHandle;
    fso = new ActiveXObject("Scripting.FileSystemObject");
    fileHandle = fso.CreateTextFile(fname, true);
    fileHandle.write(data);
    fileHandle.close();
  };
function Leaderboards() {
	try {
      fso = new ActiveXObject("Scripting.FileSystemObject");
      var fso, filehandle, contents;
      filehandle = fso.OpenTextFile(Pisteet.txt, 1);
      contents = filehandle.ReadAll();
      filehandle.Close();
    } catch (err) {
      return null;
    }
	console.log("Reading");
	document.getElementById("points").innerHTML = "Leaderboards : "+contents;
}
 
//Contact GitHub API Training Shop Blog About
//© 2017 GitHub, Inc. Terms Privacy Security Status Help
