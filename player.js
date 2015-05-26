var LEFT = 0;
var RIGHT = 1;

var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_SHOOT_LEFT = 3;
var ANIM_CLIMB = 4;
var ANIM_IDLE_RIGHT = 5;
var ANIM_JUMP_RIGHT = 6;
var ANIM_WALK_RIGHT = 7;
var ANIM_SHOOT_RIGHT = 8;
var ANIM_MAX = 9;

var PLAYER_SPEED = 300;

//var moveRight = true;

//game states for space bar
var STATE_CLIMB = 0
var STATE_RUNJUMP = 1
var gameState = STATE_CLIMB;

var Player = function()
{
	this.sprite = new Sprite("ChuckNorris.png");

	// idle left
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[0, 1 ,2, 3, 4, 5, 6, 7]);
	//jump left
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[8, 9, 10, 11, 12]);
	//walk left
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
	//shoot left
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
        [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]);
	//climb
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);
	//idle right
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[52, 53, 54, 55, 56, 57, 58, 59]);
	//jump right
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[60, 61, 62, 63, 64,]);
	//walk right
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]);
	//shoot right
	 this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
        [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92]);

	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, -55, -87);
	}

	this.position = new Vector2();
	this.position.set(1*35, 7*35);

	this.width = 159;
	this.height = 163;

	this.velocity = new Vector2();

	this.falling = true;
	this.jumping = false;

	this.isDead = false;

	this.direction = RIGHT;

	this.cooldownTimer = 0;
};

Player.prototype.update = function(deltaTime, moveRight, BULLET_SPEED)
{
	this.sprite.update(deltaTime);

	var left = false;
	var right = false;
	var jump = false;
	var up = false;
	var down = false;
	var shoot = false;

	//check keypress events
	//LEFT
	if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true)
	{
		this.x -= PLAYER_SPEED * deltaTime;
		left = true;
		this.direction = LEFT;
		if(this.sprite.currentAnimation != ANIM_WALK_LEFT)
			this.sprite.setAnimation(ANIM_WALK_LEFT);
	}
	//RIGHT
	else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true)
	{
		this.x += PLAYER_SPEED * deltaTime;
		right = true;
		this.direction = RIGHT;
		if(this.sprite.currentAnimation != ANIM_WALK_RIGHT)
			this.sprite.setAnimation(ANIM_WALK_RIGHT);
	}
	else{
		if(this.jumping == false && this.falling == false)
		{
			if(this.direction == LEFT)
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_LEFT)
					this.sprite.setAnimation(ANIM_IDLE_LEFT);
			}
			else
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_RIGHT)
					this.sprite.setAnimation(ANIM_IDLE_RIGHT);
			}
		}
	}
	if(keyboard.isKeyDown(keyboard.KEY_UP)== true)
		{
			jump = true;
		}

	if(this.cooldownTimer > 0)
	{
		this.cooldownTimer -= deltaTime;
	}

	//SHOOTING
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true && this.cooldownTimer <= 0)
	{
		sfxFire.play();
		this.cooldownTimer = 0.3;

		var	bullet = new Bullet;						//create a new bullet
		if(this.direction == LEFT)						//set bullet velocity based on current direction
		{
			Bullet.velocity = BULLET_SPEED * deltaTime;
		}
		for(var i=0; i<bullets.length; i++)				//add bullet to bullets array
		{
			bullets[i].push(Bullet);
		}
									
		cooldownTimer = 0.5;							//set bullet timer to 0.5 seconds

		/*var bullet = new Bullet();

		var BULLET_SPEED = 450;
		bullet.velocity.set *= BULLET_SPEED;
		//bullet.velocity.set *= BULLET_SPEED;
		// don't forget to set the bullet's position
		bullet.position = this.position;
		//bullet.y = player.y;
		// make the bullet alive
		bullet.isDead = false;

		
		//Bullet.position = this.position;
		//Bullet.velocity *= BULLET_SPEED;


		/*Bullet.moveRight = moveRight;
	if(Bullet.moveRight == true)
		Bullet.velocity.set(MAXDX * 2, 0);
	else
		Bullet.velocity.set(-MAXDX * 2, 0);*/

	//Bullets.push(Bullet);

		/*for(var i=0; 0<bullets.length; i++)
		{
			if(this.direction == RIGHT)
			{
				if(this.sprite.currentAnimation != ANIM_SHOOT_RIGHT)
					this.sprite.setAnimation(ANIM_SHOOT_RIGHT);
				right = true;
				shoot = true;
				//bullets.push(Bullet);
			}
			else
			{
				if(this.sprite.currentAnimation != ANIM_SHOOT_LEFT)
					this.sprite.setAnimation(ANIM_SHOOT_LEFT);
				left = true;
				shoot = true;
				//bullets.push(Bullet);
			}
		}
		//bullets.push(Bullet);
		//return;*/
	}

	var wasleft = this.velocity.x < 0;
	var wasright = this.velocity.x > 0;
	var falling = this.falling;
	var ddx = 0;				//acceleration
	var ddy = GRAVITY;

	if(left)
		ddx = ddx - ACCEL;		//player wants to go left
	else if(wasleft)
		ddx = ddx + FRICTION;	//player was going left, but not anymore

	if(right)
		ddx = ddx + ACCEL;		//player wants to go right
	else if(wasright)
		ddx = ddx - FRICTION;	//player was going left, but not anymore

	if(jump && !this.jumping && !falling)
	{
		ddy = ddy - JUMP;		//apply an instantaneous (large) vertical impulse
		this.jumping = true;
		if(this.direction == LEFT)
			this.sprite.setAnimation(ANIM_JUMP_LEFT)
		else
			this.sprite.setAnimation(ANIM_JUMP_RIGHT)
	}

	//calculate the new position and velocity:
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);

	if ((wasleft && (this.velocity.x > 0)) ||
		(wasright && (this.velocity.x < 0)))
	{
		//clamp at zero to prevent friction from making us jiggle side to side
		this.velocity.x = 0;
	}
	//collision detection
	//Our collision detection logic is greatly simplified  by the fact that the
	//player is a rectangle and is exactly the same size as a single title.
	//So we know that the player can only ever occupy 1, 2 or 4 cells.

	//This means we can short-circuit and avoid building a general purpose
	//collision detection engine by simply looking at the 1 to 4 cells that
	//the player occupies:
	var tx = pixelToTile(this.position.x);
	var ty = pixelToTile(this.position.y);
	var nx = (this.position.x)%TILE;
	var ny = (this.position.y)%TILE;
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
	var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);

	//if the player has vertical velocity, then check to see if they have hit
	//a platform below or above, in which case, stop their vertical velocity, 
	//and clamp their y positon:
	if(this.velocity.y > 0)
	{
		if((celldown && !cell) || (celldiag && !cellright && nx))
		{
			//clamp the y position to avoid falling into platform below
			this.position.y = tileToPixel(ty);
			this.velocity.y = 0				//stop downward velocity
			this.falling = false;			//no longer falling
			this.jumping = false;			//(or jumping)
			ny = 0;							//no longer overlaps the cells below
		}
	}
	else if (this.velocity.y < 0)
	{
		if((cell && !celldown) || (cellright && !celldiag && nx))
		{
			//clamp the y position to avoid jumping into platform above
			this.position.y = tileToPixel(ty + 1);
			this.velocity.y = 0;				//stop unward velocity
			//player is no longer really in that cell, we clamoed them to the cell below
			cell = celldown;
			cellright = celldiag;			//(ditto)
			ny = 0;							//player no longr overlaps the cells below
		}
		if(this.velocity.x > 0)
		{
			if((cellright && !cell) || (celldiag && !celldown && ny))
			{
				//clamp the x position to avoid moving into the platform we just hit
				this.position.x = tileToPixel(tx);
				this.velocity.x = 0; 		//stop horizontal velocity
			}
		}
		else if (this.velocity.x < 0)
		{
			if((cell && !cellright) || (celldown && !celldiag && ny))
			{
				//clamp the x position to avoid moving into the platform we just hit
				this.position.x = tileToPixel(tx + 1);
				this.velocity.x = 0;		//stop horizontal velocity
			}
		}
	}
	/*//RUNJUMPSTATE
	//mostly stays the same, but we add some new logic
	//at the end of the function
	if(right == false && left == false && this.falling == false)
	{
		//player is not moving or falling, but could be
		//jumping (because we use the up key for both
		//jumping and climbing)
		var cell = cellAtTileCoord(LAYER_LADDERS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_LADDERS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_LADDERS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_LADDERS, tx + 1, ty + 1);
		//check if we are standing at the bottom of a ladder
		if(!cell || !cellright)
		{
			if(keyboard.isKeyDown(keyboard.KEY_UP)== true)
			{
				gameState = STATE_CLIMB;
				this.sprite.setAnimation(ANIM_CLIMB);
				return;
			}
		}
		//check if we standing at the top of a ladder
		if(!celldown || !celldiag)
		{
			if(keyboard.isKeyDown(keyboard.KEY_DOWN)== true)
			{
				gameState = STATE_RUNJUMP;
				this.sprite.setAnimation(ANIM_CLIMB);
				return;
			}
		}
	}

	switch(gameState)
	{
		case STATE_RUNJUMP:
			player.gameStateRunJump(deltaTime, left);
		break;
		case STATE_CLIMB:
			player.gameStateClimb(deltaTime, left);
		break;
	}*/
}	

/*Player.prototype.gameStateRunJump = function(deltaTime, left)
{
	if(this.falling == false)
	{
		if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
		{
			jump = true;
		}
	}
}

Player.prototype.gameStateClimb = function(deltaTime, left)
{
	/*if(this.falling == false && this.jumping == false && left == false && right == false)
	{
		if(keyboard.isKeyDown(keyboard.KEY_UP) == true)
		{
			up = true;
			if(this.sprite.currentAnimation != ANIM_CLIMB)
				this.sprite.setAnimation(ANIM_CLIMB);
			{
				this.velocity.y = 0;
			}
		}
	}
}*/

Player.prototype.draw = function()
{
	//context.drawImage(this.image, this.position.x - worldOffsetX, this.position.y);
	this.sprite.draw(context, this.position.x - worldOffsetX, this.position.y);
}