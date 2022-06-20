// import files
import * as PIXI from 'pixi.js'
import pepperoniPizza from "./images/pepperoni.png"
import bottomPizza from "./images/bottom.png"

// create a pixi canvas
const pixi = new PIXI.Application({ width: 800, height: 450 })
const drawBuffer = new PIXI.Container();
const renderTexture = PIXI.RenderTexture.create({width: 1024, height: 1024});

const drawingStarted = false;
const lastPosition = null;

document.body.appendChild(pixi.view)

// preload all the textures
const loader = new PIXI.Loader()
// loader.add('', ) laadt de images in de variabelen uit de import
loader.add('pepperoniTexture', pepperoniPizza)
loader.add('bottomTexture', bottomPizza)
loader.load(()=>loadCompleted())


// [LOADING COMPLETE]
function loadCompleted() {
    let pepperoni = new PIXI.Sprite(loader.resources["pepperoniTexture"].texture!)
    let bottom = new PIXI.Sprite(loader.resources["bottomTexture"].texture!)
    pixi.stage.addChild(pepperoni);
    pixi.ticker.add((delta) => update(delta))


//updaten positie van de pizza en registreren van een nieuwe pizza
    function update(delta:number) {
        pepperoni.y -= 5 * delta
        if (pepperoni.y < -600) {
            pixi.stage.removeChild(pepperoni)
            if (pixi.stage.children.length == 0){
                pixi.stage.addChild(bottom);
                console.log(`is dat zo dylan?`)
            }
        }
    }

    pepperoni.anchor.set(0.5);
    pepperoni.width = pixi.screen.height / 2;
    pepperoni.height = pixi.screen.height / 2;
    pepperoni.position.set(pixi.screen.width / 2, pixi.screen.height / 2);
    pepperoni.interactive = true;

    bottom.anchor.set(0.5);
    bottom.width = pixi.screen.height / 2;
    bottom.height = pixi.screen.height / 2;
    bottom.position.set(pixi.screen.width / 2, pixi.screen.height / 2);
    bottom.interactive = true;

}

