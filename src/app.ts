// import files
import * as PIXI from 'pixi.js'
import pizza from './images/pizza.png'

// create a pixi canvas
const pixi = new PIXI.Application({ width: 800, height: 450 })
document.body.appendChild(pixi.view)

// preload all the textures
const loader = new PIXI.Loader()
loader.add('pizzaTexture', pizza) // laadt de images in de variabelen uit de import
loader.load(()=>loadCompleted())

// after loading is complete
function loadCompleted() {
    let pizza = new PIXI.Sprite(loader.resources['pizzaTexture'].texture!)
    pixi.stage.addChild(pizza);
    pizza.anchor.set(0.5);
    pizza.height = pixi.screen.height / 2;
    pizza.height = pixi.screen.width / 2;
    pizza.position.set(pixi.screen.width / 2, pixi.screen.height / 2);
// voeg variabele toe aan het pixi canvas
}
