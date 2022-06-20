// import files
import * as PIXI from 'pixi.js'

// create a pixi canvas
const pixi = new PIXI.Application({ width: 800, height: 450 })
const pixiCanvas = document.getElementById("pixi-canvas")
if (pixiCanvas != null) {
    pixiCanvas.appendChild(pixi.view)
}

// preload all the textures
const loader = new PIXI.Loader()
loader.add('', ) // laadt de images in de variabelen uit de import
loader.load(()=>loadCompleted())

// after loading is complete
function loadCompleted() {
    let completed = new PIXI.Sprite(loader.resources[""].texture!) // zet image om in een sprite en zet deze in een variabele
    pixi.stage.addChild() // voeg variabele toe aan het pixi canvas
}