var Enemy = function()
{
	this.image = document.createElement("img");
	this.x = 500;
	this.y = canvas.height/2;
	this.width = 24;
	this.height = 70;
	this.isDead = false;

	this.image.src = "mark1.png"
};

Enemy.prototype.update = function(deltaTime)
{
	//can enter in controls if want to
}

Enemy.prototype.draw = function()
{
	context.save();
		context.translate(this.x, this.y);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
}