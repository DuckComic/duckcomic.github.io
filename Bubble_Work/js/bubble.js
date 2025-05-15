var canvas = document.querySelector('canvas');
var c;

if (!canvas) {
    console.error("Canvas element not found!");
} else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c = canvas.getContext('2d');
}


// c.fillStyle = "rgba(255,0,0,0.4)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "#afafaf";
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = "#a8dfca";
// c.fillRect(300, 300, 100, 100);
// c.fillRect(500, 500, 100, 100);

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#babadc";
// c.stroke();

// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "#edbedb";
// c.stroke();
/*
for(var i = 0; i < 3; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = "#decabe";
    c.stroke();
}*/

// c.beginPath();
// c.arc(200, 200, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

//This is a constructor function
function Circle(x, y, dx, dy, radius) {
    //Ensures each circle remembers it's own position (this means the object we're talking about right now)
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    //This is a mini-function that just draws the circle
    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = "white";
        c.stroke();
        // c.fillStyle();
    }
    //This makes the circle move and bounce
    this.update = function(){
        //if the circle hit's the left or right edge then it flips it's direction
        if(this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        //this is the same but for top and bottom
        if(this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        //this moves the circle by adding the speed to the position
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

//Holds the circles
var circleArray = [];

//Creates 1000 circles with random positions and speeds
for(var i = 0; i < 1000; i++) {
    var radius = Math.random(1, 30) ;

    //var circle = new Circle(200, 200, 3, 3, 30);
    //gives the circles random starting positions but keeps them on screen
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;

    //random speed for both x and y between -0.5 and +0.5 so they can go in any direction
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    //creates a new circle with random properties and adds it to the array of circles
    circleArray.push(new Circle(x, y, dx, dy, radius));
}

//This is the main loop that updates the canvas and redraws the circles every frame
function animate() {
    //tells the broswer to keep running the animate function (around 60 times a second)
    requestAnimationFrame(animate);
    //clears the canvas so it's blank every frame
    c.clearRect(0, 0, innerWidth, innerHeight);

    //redraws each circle in the array, so they move and bounce around the canvas
    for(var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();