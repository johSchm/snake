// constructor function
// creates the snake obj
function Snake()
{
	// init the snake obj
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.totalLen = 0;
	this.tail = [];


	// snake eats food
	this.eat = function(pos)
	{
		var distance = dist(this.x, this.y, pos.x, pos.y);

		// if the distance between the snake and the food
		// is less then the threshold, than evolve the snake
		if (distance < 1)
		{
			this.totalLen++;
			return true;
		}
		else
		{
			return false;
		}
	}


	// checks whether the snake touches itself or not
	// if so then reset the snake
	this.death = function()
	{
		for(var i = 0; i < this.tail.length; i++)
		{
			var pos = this.tail[i];
			var distance = dist(this.x, this.y, pos.x, pos.y);

			// snake touches itself
			if (distance < 1)
			{
				// reset the snake
				this.totalLen = 0;
				this.tail = [];
			}
		}
	}


	// respawn the snake at the opposite site
	// when it reached the border of the canvas
	this.border = function()
	{
		if (this.yspeed === 0)
		{
			// right canvas border
			if (this.x >= (width - scl))
			{
				this.x = 0;
			}

			// left canvas border
			else if (this.x <= 0)
			{
				this.x = (width - scl);
			}
		}

		else if (this.xspeed === 0)
		{
			// upper canvas border
			if (this.y >= (height - scl))
			{
				this.y = 0;
			}

			// lower canvas border
			else if (this.y <= 0)
			{
				this.y = (height - scl);
			}
		}
	}


	// return the current length of the snake
	this.getLength = function()
	{
		return this.totalLen;
	}


	// update position of the snake obj
	this.dir = function(x,y)
	{
		this.xspeed = x;
		this.yspeed = y;
	}


	// update the snake obj with new values
	this.update = function()
	{
		// no food been eaten yet
		if (this.totalLen === this.tail.length)
		{
			// shift all snake parts by one
			for (var i = 0; i < this.tail.length - 1; i++)
			{
				this.tail[i] = this.tail[i + 1];
			}
		}

		// add a new part at the end of the snake
		this.tail[this.totalLen - 1] = createVector(this.x, this.y);

		this.x += this.xspeed * scl;
		this.y += this.yspeed * scl;

		// constrains the snake to the canvas borders
		this.x = constrain(this.x, 0, width  - scl);
		this.y = constrain(this.y, 0, height - scl);
	}


	// draw the snake obj
	this.show = function()
	{
		fill(255); // white

		// draw all parts of the snake
		for (var i = 0; i < this.tail.length; i++)
		{
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}

		rect(this.x, this.y, scl, scl);
	}
}