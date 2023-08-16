export class UI {
	constructor(game) {
		this.game = game;
		this.fontSize = 30;
		this.fontFamily = "Helvetica";
	}
	draw(context) {
		context.save();
		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;
		context.shadowColor = "white";
		context.shadowBlur = 0;
		context.font = this.fontSize + "px " + this.fontFamily;
		context.textAlign = "left";
		context.fillStyle = this.game.fontColor;
		//score
		context.fillText("Score: " + this.game.score, 20, 50);
		//Time
		context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
		context.fillText("Time: " + (this.game.time * 0.001).toFixed(1), 20, 80);
		//Energy
		context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
		context.fillText("Energy: " + this.game.energy.toFixed(0), 20, 110);
		//gameOver Message
		if (this.game.gameOver) {
			context.textAlign = "center";

			if (this.game.score > 5) {
				context.font = this.fontSize * 2 + "px " + this.fontFamily;
				context.fillText(
					"Boo-yah",
					this.game.width * 0.5,
					this.game.height * 0.5 - 20
				);

				context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
				context.fillText(
					"What are creatures of the night afraid of? YOU!!!",
					this.game.width * 0.5,
					this.game.height * 0.5 + 20
				);
			} else {
				context.font = this.fontSize * 1 + "px " + this.fontFamily;
				context.fillText(
					"Game ver in first Bite!!",
					this.game.width * 0.5,
					this.game.height * 0.5 - 20
				);

				context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
				context.fillText(
					"Better Luck Next Time",
					this.game.width * 0.5,
					this.game.height * 0.5 + 20
				);
			}
		}
		context.restore();
	}
}
