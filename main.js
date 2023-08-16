import InputHandler from "./input.js";
import Player from "./player.js";
import { Background } from "./background.js";
import { FlyingEnemy, ClimbingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener("load", () => {
	const canvas = document.getElementById("canvas1");
	const ctx = canvas.getContext("2d");
	canvas.width = 500;
	canvas.height = 500;

	class Game {
		constructor(width, height) {
			this.width = width;
			this.height = height;
			this.groundMargin = 80;
			this.speed = 0;
			this.maxSpeed = 3;
			this.background = new Background(this);
			this.player = new Player(this);
			this.input = new InputHandler(this);
			this.UI = new UI(this);
			this.enemies = [];
			this.particles = [];
			this.collsions = [];
			this.maxParticles = 100;
			this.enemyInterval = 1000;
			this.enemyTimer = 0;
			this.enemyTypes = ["flying", "ground", "climbing"];
			this.debug = false;
			this.score = 0;
			this.time = 0;
			this.maxTime = 100000;
			this.energy = 50;
			this.energyTimer = 0;
			this.energyInterval = 3000;

			this.fontColor = "black";
			this.player.currentState = this.player.states[0];
			this.player.currentState.enter();
			this.gameOver = false;
		}
		update(deltaTime) {
			//Update Time
			this.time += deltaTime;
			if (this.time > this.maxTime) this.gameOver = true;

			this.background.update();
			this.player.update(this.input.keys, deltaTime);

			//Handle Enemy
			if (this.enemyTimer > this.enemyInterval) {
				this.enemyTimer = 0;
				this.addEnemy();
			} else {
				this.enemyTimer += deltaTime;
			}

			this.enemies.forEach((object) => {
				object.update(deltaTime);
				if (object.markedForDeletion)
					this.enemies.splice(this.enemies.indexOf(object), 1);
			});
			//handle particles
			this.particles.forEach((particle, index) => {
				particle.update();
				if (particle.markedForDeletion) this.particles.splice(index, 1);
			});
			if (this.particles.length > this.maxParticles) {
				this.particles = this.particles.slice(0, 50);
			}
			//handle Collsions
			this.collsions.forEach((collsion, index) => {
				collsion.update(deltaTime);
				if (collsion.markedForDeletion) this.collsions.splice(index, 1);
			});
			// Energy
			if (this.energyTimer > this.energyInterval) {
				this.energyTimer = 0;
				this.energy++;
			} else {
				this.energyTimer += deltaTime;
			}
			if (this.energy < 0) this.energy = 0;
		}
		draw(context) {
			this.background.draw(context);
			this.player.draw(context);
			this.enemies.forEach((object) => object.draw(context));
			this.UI.draw(context);

			this.particles.forEach((particle) => {
				particle.draw(context);
			});
			this.collsions.forEach((collsion) => {
				collsion.draw(context);
			});
		}
		addEnemy() {
			if (this.speed > 0 && Math.random() < 0.5)
				this.enemies.push(new GroundEnemy(this));
			else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
			this.enemies.push(new FlyingEnemy(this));
		}
	}

	const game = new Game(canvas.width, canvas.height);
	let lastTime = 0;

	function animate(timestamp) {
		const deltaTime = timestamp - lastTime;
		lastTime = timestamp;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.update(deltaTime);
		game.draw(ctx);
		if (!game.gameOver) requestAnimationFrame(animate);
	}
	animate(0);
});
