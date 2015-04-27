/*var Collision = function(deltaTime)
{
	if(this.y2 + this.h2 < this.y1 ||
		this.x2 + this.w2 < this.x1 ||
		this.x2 > this.x1 + this.w1 ||
		this.y2 > this.y1 + this.h1)
	{
		return false;
	}
	return true;
}

Collision.prototype.checkCollision = function()
{
	for(var i=0; i<bullets.length; i++)
	{
		if(Enemy.y + Enemy.height < Bullet.y ||
			Enemy.x + Enemy.width < Bullet.x ||
			Enemy.x > Bullet.x + Bullet.width ||
			Enemy.y > Bullet.y + Bullet.height)
		{
			Enemy.isDead = true;
			bullets.splice(i,1);
		}
	}
}

/*Collision.prototype.checkCollision = function()
{
	if(function())
}*/
