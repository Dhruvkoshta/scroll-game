import {
	Sitting,
	Running,
	Jumping,
	Falling,
	Rolling,
	Diving,
	Hit,
} from "./states.js";
import { CollisionAnimation } from "./collisionAnimation.js";

export default class Player {
	constructor(game) {
		this.game = game;
		this.width = 100;
		this.height = 91.3;
		this.image = playerImage;
		this.x = 0;
		this.y = this.game.height - this.height - this.game.groundMargin;
		this.vy = 0;
		this.gravity = 1;
		this.speed = 0;
		this.maxSpeed = 10;
		this.frameX = 0;
		this.frameY = 0;
		this.maxFrame = 4;
		this.fps = 20;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;
		this.states = [
			new Sitting(this.game),
			new Running(this.game),
			new Jumping(this.game),
			new Falling(this.game),
			new Rolling(this.game),
			new Diving(this.game),
			new Hit(this.game),
		];
	}
	update(input, deltaTime) {
		this.checkCollision();

		this.currentState.handleInput(input);
		// Horizontal Movement
		this.x += this.speed;
		if (input.includes("ArrowRight") && this.currentState !== this.states[6])
			this.speed = this.maxSpeed;
		else if (
			input.includes("ArrowLeft") &&
			this.currentState !== this.states[6]
		)
			this.speed = -this.maxSpeed;
		else this.speed = 0;

		// Vertical Movement

		this.y += this.vy;
		if (!this.onGround()) {
			this.vy += this.gravity;
		} else {
			this.vy = 0;
		}

		//Sprite Animation
		if (this.frameTimer > this.frameInterval) {
			this.frameTimer = 0;
			if (this.frameX < this.maxFrame) this.frameX++;
			else this.frameX = 0;
		} else {
			this.frameTimer += deltaTime;
		}

		//Boundaries
		if (this.x < 0) this.x = 0;
		if (this.x > this.game.width - this.width)
			this.x = this.game.width - this.width;

		if (this.y > this.game.height - this.height - this.game.groundMargin)
			this.y = this.game.height - this.height - this.game.groundMargin;
	}
	onGround() {
		return this.y >= this.game.height - this.height - this.game.groundMargin;
	}
	draw(context) {
		if (this.game.debug)
			context.strokeRect(this.x, this.y, this.width, this.height);
		context.drawImage(
			this.image,
			this.frameX * this.width,
			this.frameY * this.height,
			this.width,
			this.height,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
	setState(state, speed) {
		this.currentState = this.states[state];
		this.game.speed = this.game.maxSpeed * speed;
		this.currentState.enter();
	}
	checkCollision() {
		this.game.enemies.forEach((enemy) => {
			if (
				enemy.x < this.x + this.width &&
				enemy.x + enemy.width > this.x &&
				enemy.y < this.y + this.height &&
				enemy.y + enemy.height > this.y
			) {
				enemy.markedForDeletion = true;
				this.game.collsions.push(
					new CollisionAnimation(
						this.game,
						enemy.x + enemy.width * 0.5,
						enemy.y + enemy.height * 0.5
					)
				);
				if (
					this.currentState === this.states[4] ||
					this.currentState === this.states[5]
				) {
					this.game.score++;
					this.game.energy++;
				} else {
					this.setState(6, 0);
				}
			}
		});
	}
}
