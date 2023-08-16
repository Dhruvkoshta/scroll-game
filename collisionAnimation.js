export class CollisionAnimation {
	constructor(game, x, y) {
		this.game = game;
		this.image = collision;
		this.spriteWidth = 100;
		this.spriteHeight = 90;
		this.sizemodifier = Math.random() + 0.5;
		this.width = this.spriteHeight * this.sizemodifier;
		this.height = this.spriteHeight * this.sizemodifier;
		this.x = x - this.width * 0.5;
		this.y = y - this.height * 0.5;
		this.frameX = 0;
		this.maxFrame = 4;
		this.markedForDeletion = false;
		this.fps = 15;
		this.frameIntrval = 1000 / this.fps;
		this.frameTimer = 0;
	}
	update(deltaTime) {
		this.x -= this.game.speed;
		if (this.frameTimer > this.frameIntrval) {
			this.frameTimer = 0;
			this.frameX++;
		} else this.frameTimer += deltaTime;

		if (this.frameX > this.maxFrame) {
			this.markedForDeletion = true;
		}
	}
	draw(context) {
		context.drawImage(
			this.image,
			this.frameX * this.spriteWidth,
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}
