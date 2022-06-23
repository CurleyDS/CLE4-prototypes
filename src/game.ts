// import files
import * as PIXI from 'pixi.js'
import pizzaImage from './images/pizza.png'
import musicBackground from "url:./audio/bgm.mp3";
import { Pizza } from "./pizza"

export class Game {

	pixiCanvas:any = document.getElementById("pixi-canvas");
  	pixi:PIXI.Application;
	resetButton:any = document.getElementById('reset');
	ingredientButtons:HTMLCollectionOf<Element>;
	oldIngredient:number;
	currentIngredient:number;
	pizza:Pizza;
	sound:any;
	loader:PIXI.Loader;
	
	constructor() {
		// create a pixi canvas
		this.pixi = new PIXI.Application({ width: 800, height: 450});
		this.pixiCanvas.appendChild(this.pixi.view);

		this.ingredientButtons = document.getElementsByClassName('ingredient');

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
			this.resetButton.disabled = true;
			return true;
		}
		return false;
	}

	toggleIngredient() {
		for (var x = 0; x < this.ingredientButtons.length; x++) {
			if (this.oldIngredient != this.currentIngredient) {
				if (typeof this.oldIngredient !== 'undefined' && this.ingredientButtons[this.oldIngredient].checked) {
					this.ingredientButtons[this.oldIngredient].checked = false;
				}
				this.oldIngredient = this.currentIngredient;
			}
			if (this.ingredientButtons[x].checked) {
				this.currentIngredient = x;
			}
		}
	}

	update(delta:number) {
		this.toggleIngredient();
		this.pizza.update(delta, this.currentIngredient);
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
					
					for (let x = 0; x < this.ingredientButtons.length; x++) {
						this.ingredientButtons[x].checked = false;
					}

					this.resetButton.checked = false;
					this.resetButton.disabled = false;
				}
			}
		}
	}

}

new Game();
