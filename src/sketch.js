// global vars
var snake;
var scl = 20; // rasterize scale grid
var food;
var points = 0;


// setup
function setup()
{
	createCanvas(800,800);

	// slows the game down
	frameRate(10);

	// creates the snake
	snake = new Snake();

	// randomly spawn a piece of food
	pickLocation();
}


// draw
function draw()
{
	background(51);

	// snake food evolution
	if (snake.eat(food))
	{
		// draw a new random food piece
		pickLocation();
	}

	// move and draw the snake
	snake.update();
	snake.show();
	snake.death();
	snake.border();

	// creates point counter
	points = snake.getLength();
	textSize(100);
	text(points, (width / 2) - 30, 100);

	// creates a food rect
	fill(176, 244, 66);
	rect(food.x, food.y, scl, scl);
}


// creates a piece of food
// with a random position
function pickLocation()
{
	var cols = floor(width/scl);
	var rows = floor(height/scl);

	var rndCol = floor(random(cols));
	var rndRow = floor(random(rows));

	food = createVector(rndCol, rndRow);

	// scale out to rect size
	food.mult(scl);
}


// handles the key inputs
function keyPressed()
{
	// up
	if (keyCode === UP_ARROW)
	{
		snake.dir(0,-1);
	}

	// down
	else if (keyCode === DOWN_ARROW)
	{
		snake.dir(0,1);
	}

	// right
	else if (keyCode === RIGHT_ARROW)
	{
		snake.dir(1,0);
	}

	// left
	else if (keyCode === LEFT_ARROW)
	{
		snake.dir(-1,0);
	}
}
