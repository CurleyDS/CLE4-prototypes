// import files
import * as PIXI from 'pixi.js'
import pizzaImage from './images/pizza.png'
import sauceImage from './images/sauce.png'
import { Pizza } from "./pizza"
import { Sauce } from "./sauce"

export class Game {

	pixi:PIXI.Application;
	pizza:Pizza;
	sauce:Sauce[] = [];
	drawPosition:any = null;
	drawingStarted:boolean = false;
	loader:PIXI.Loader;
	
	constructor() {
		// create a pixi canvas
		this.pixi = new PIXI.Application({ width: 800, height: 450, });
		document.body.appendChild(this.pixi.view);

		// preload all the textures
		this.loader = new PIXI.Loader();
		this.loader
			.add('pizzaTexture', pizzaImage) // laadt de images in de variabelen uit de import
			.add('sauceTexture', sauceImage); // laadt de images in de variabelen uit de import
		this.loader.load(() => this.loadCompleted());
	}

	// after loading is complete
	loadCompleted() {
		this.pizza = new Pizza(
			this.loader.resources["pizzaTexture"].texture!,
			this.pixi.screen.width,
			this.pixi.screen.height
		);
		this.pixi.stage.addChild(this.pizza);
		
		const onDown = (e:any) => {
			const position = this.pizza.toLocal(e.data.global);
			position.x += 400; // canvas size is 1024x1024, so we offset the position by the half of its resolution
			position.y += 225;

			if (this.insideBorder(position)) {
				this.drawPosition = position;
				this.drawingStarted = true;
			}
		}

		const onMove = (e:any) => {
			if (this.drawingStarted) {
				const position = this.pizza.toLocal(e.data.global);
				position.x += 400;
				position.y += 225;

				if (this.insideBorder(position)) {
					console.log("inside borders");
					this.drawPosition = position;
				} else {
					console.log("outside borders");
					this.drawingStarted = false;
				}
			}
		}

		const onUp = (e:any) => {
			this.drawingStarted = false;
		}

		this.pizza.on('mousedown', onDown);
		this.pizza.on('touchstart', onDown);
		this.pizza.on('mousemove', onMove);
		this.pizza.on('touchmove', onMove);
		this.pizza.on('mouseup', onUp);
		this.pizza.on('touchend', onUp);

		this.pixi.ticker.add(() => this.addSauce());
	}

	insideBorder(position:any) {
		if (position != null) {
			const bounds = this.pizza.hitbox;
			let center = {
				x: 400,
				y: 225
			};
	
			let distance = (center.x - position.x) * (center.x - position.x) + (center.y - position.y) * (center.y - position.y);
			let radius = bounds.radius * bounds.radius;
			if (distance < radius) {
				return true;
			}
			return false;
		}
	}

	addSauce() {
		if (this.insideBorder(this.drawPosition)) {
			if (this.drawingStarted) {
				let sauce = new Sauce(this.loader.resources["sauceTexture"].texture!, this.drawPosition)
				this.pixi.stage.addChild(sauce);
				this.sauce.push(sauce);
			}
		}
	}

}

new Game();