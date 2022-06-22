// import files
import * as PIXI from 'pixi.js'
import pizzaImage from './images/pizza.png'
import musicBackground from "url:./audio/bgm.mp3";
import { Pizza } from "./pizza"

export class Game {

	pixiCanvas:any = document.getElementById("pixi-canvas");
  	pixi:PIXI.Application;
	resetButton:any = document.getElementById('reset');
	pizza:Pizza;
	sound:any;
	loader:PIXI.Loader;
	
	constructor() {
		// create a pixi canvas
		this.pixi = new PIXI.Application({ width: 800, height: 450});
		this.pixiCanvas.appendChild(this.pixi.view);

		// preload all the textures
		this.loader = new PIXI.Loader();
		this.loader
			.add('pizzaTexture', pizzaImage) // laadt de images in de variabelen uit de import
      		.add("bgm", musicBackground)

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
    
		this.sound = this.loader.resources["bgm"].data;
		this.sound.volume = 0.25;
		
		this.pixi.ticker.add((delta) => this.update(delta));
	}

	resetPizza() {
		if (this.resetButton.checked) {
			return true;
		}
		return false;
	}

	update(delta:number) {
		this.pizza.update(delta);

		this.sound.play();
		
		if (this.resetPizza()) {
			this.pizza.y -= 5 * delta
			if (this.pizza.y < -600) {
				this.pixi.stage.removeChild(this.pizza)
				if (this.pixi.stage.children.length == 0){
					this.pizza = new Pizza(
						this.loader.resources["pizzaTexture"].texture!,
						this.pixi.screen.width,
						this.pixi.screen.height
					);
					this.pixi.stage.addChild(this.pizza);
					this.resetButton.checked = false;
				}
			}
		}
	}

}

new Game();
