/*var Bullet = function()
{
	this.image = document.createElement("img");
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.width = 23;
	this.height = 8;
	this.shoot = false;
	this.image.src = "bullet.png";
}

Bullet = new Array();
var shootTimer = 1;
var BULLET_SPEED = 3

Bullet.prototype.playerShoot = function()
{
//start off with a velocity that shoots the bullet straight up
	var this.velX = 0;
	var this.velY = 1;
	
	//now rotate this vector according to the ship's current rotation
	var this.s = Math.sin(player.rotation);
	var this.c = Math.cos(player.rotation);
	
	//for an explanation of this formula,
	//see http://en.wikipedia.og/wiki/Rotation_matrix
	var xVel = (this.velX * this.c) - (this.velY * this.s);
	var yVel = (this.velX * this.s) + (this.velY * this.c);
	
	bullet.velocityX = xVel * BULLET_SPEED;
	bullet.velocityY = yVel * BULLET_SPEED;
	
	//finally, add the bullet to the bullets array
	bullets.push(bullet);
}


Bullet.prototype.update = function(deltaTime)
{
	//update the shoot timer
	if(shootTimer > 0)
			shootTimer -= deltaTime;
	
	//update all the bullets
	for(var i=0; i<bullets.length; i++)
	{
		bullets[i].x += bullets[i].velocityX * deltaTime;
		bullets[i].y += bullets[i].velocityY * deltaTime;
	}
	
	if(shoot == false && shootTimer <= 0)
	{
	for(var i=0; i<bullets.length; i++)
	{
		//check if the bullet has gone out of screen boundaries
		//and if so kill it
		if(bullets[i].x < -bullets[i].width ||
		bullets[i].x > SCREEN_WIDTH ||
		bullets[i].y < -bullets[i].height ||
		bullets[i].y > SCREEN_HEIGHT)
		{
			//remove 1 element at position i
			bullets.splice(i, 1);
			//because we are deleting elements from the middle of the
			//array, we can only remove 1 at a time. So, as soon as we
			//remove 1 bullet stop.
			break;
		}
	}
	}	
}

Bullet.prototype.shoot(deltaTime)
{
	if(keyboard.isKeyDown(keyboard.KEY_SHIFT) == true);
	{
		this.shoot ==  true;
	}
	else
	{
		this.shoot == false;
	}
}

Bullet.prototype.draw = function()
{
	//draw all the bullets
	for(var i=0; i<bullets.length; i++)
	{
		context.drawImage(bullets[i].image,
		bullets[i].x - bullets[i].width/2,
		bullets[i].y - bullets[i].height/2);
	}
}*/
