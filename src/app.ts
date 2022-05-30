// import files
import * as PIXI from 'pixi.js'
import pizzaImage from './images/pizza.png'
import sauceImage from './images/sauce.png'

export class Game {

	pixi:PIXI.Application
	pizza:PIXI.Sprite
	drawPosition:any
	drawingStarted:boolean
	loader:PIXI.Loader
	
	constructor() {
		// create a pixi canvas
		this.pixi = new PIXI.Application({ width: 800, height: 450, })
		document.body.appendChild(this.pixi.view)

		this.drawPosition = null;
		this.drawingStarted = false

		// preload all the textures
		this.loader = new PIXI.Loader()
		this.loader
			.add('pizzaTexture', pizzaImage) // laadt de images in de variabelen uit de import
			.add('sauceTexture', sauceImage) // laadt de images in de variabelen uit de import
		this.loader.load(() => this.loadCompleted())
	}

	// after loading is complete
	loadCompleted() {
		this.pizza = new PIXI.Sprite(this.loader.resources["pizzaTexture"].texture!);
		this.pizza.anchor.set(0.5);
		this.pizza.width = this.pixi.screen.height / 2;
		this.pizza.height = this.pixi.screen.height / 2;
		this.pizza.position.set(this.pixi.screen.width / 2, this.pixi.screen.height / 2);
		this.pizza.interactive = true;
		this.pixi.stage.addChild(this.pizza);
		
		const onDown = (e:any) => {
			const position = this.pizza.toLocal(e.data.global);
			position.x += 400; // canvas size is 1024x1024, so we offset the position by the half of its resolution
			position.y += 225;

			this.drawPosition = position;
			this.drawingStarted = true;
		}

		const onMove = (e:any) => {
			if (this.drawingStarted) {
				const position = this.pizza.toLocal(e.data.global);
				position.x += 400;
				position.y += 225;

				this.drawPosition = position;
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

		this.pixi.ticker.add((delta) => this.draw(delta, this.drawPosition));
	}

	draw(delta:number, position:any) {
		if (this.drawingStarted) {
			let sauce = new PIXI.Sprite(this.loader.resources["sauceTexture"].texture!)
			sauce.anchor.set(0.5);
			sauce.x = position.x;
			sauce.y = position.y;
			this.pixi.stage.addChild(sauce);
		}
	}

}

new Game()