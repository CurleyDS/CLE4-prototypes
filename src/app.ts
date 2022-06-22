// import files
import * as PIXI from 'pixi.js'

// create a pixi canvas
const pixi = new PIXI.Application({ width: 800, height: 450 })
document.body.appendChild(pixi.view)

// preload all the textures
const loader = new PIXI.Loader()
loader.load(()=>loadCompleted())

// after loading is complete
function loadCompleted() {
    
// voeg variabele toe aan het pixi canvas
}
