var Bullet = function(){
	this.image = document.createElement("img");
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.width = 23;
	this.height = 8;

	this.image.src = "bullet.png";
}

Bullet.prototype.update = function(deltaTime)
{

}

Bullet.prototype.draw = function()
{
	context.save();
		context.translate(this.x, this.y);
		context.drawImage(this.image, -this.width/2, -this.height/2);
	context.restore();
}