// import files
import * as PIXI from 'pixi.js'
import pizzaImage from './images/pizza.png'
import sauceImage from './images/sauce.png'

// create a pixi canvas
const pixi = new PIXI.Application({ width: 800, height: 450, })
document.body.appendChild(pixi.view)


const pizza = new PIXI.Graphics();

// Circle
pizza.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
pizza.beginFill(0xFDDA0D, 1);
pizza.drawCircle(100, 250, 50);
pizza.endFill();

let drawingStarted:boolean = false

// preload all the textures
const loader = new PIXI.Loader()
loader.add('pizzaTexture', pizzaImage) // laadt de images in de variabelen uit de import
loader.add('sauceTexture', sauceImage) // laadt de images in de variabelen uit de import
loader.load(()=>loadCompleted())

// after loading is complete
function loadCompleted() {
    const sprite = new PIXI.Sprite(loader.resources["pizzaTexture"].texture!);
    sprite.anchor.set(0.5);
    sprite.width = pixi.screen.height / 2;
    sprite.height = pixi.screen.height / 2;
    sprite.position.set(pixi.screen.width / 2, pixi.screen.height / 2);
    sprite.interactive = true;
    pixi.stage.addChild(sprite);

	let drawPosition:any = null;
	
	const onDown = (e:any) => {
		const position = sprite.toLocal(e.data.global);
		position.x += 400; // canvas size is 1024x1024, so we offset the position by the half of its resolution
		position.y += 225;

		drawPosition = position;
		drawingStarted = true;
	};

	const onMove = (e:any) => {
		const position = sprite.toLocal(e.data.global);
		position.x += 400;
		position.y += 225;

		drawPosition = position;
	};

	const onUp = (e:any) => {
		drawingStarted = false;
	};

	sprite.on('mousedown', onDown);
	sprite.on('touchstart', onDown);
	sprite.on('mousemove', onMove);
	sprite.on('touchmove', onMove);
	sprite.on('mouseup', onUp);
	sprite.on('touchend', onUp);

	pixi.ticker.add((delta) => draw(delta, drawPosition));
}

function draw(delta:number, position:any) {
	if (drawingStarted) {
		let sauce = new PIXI.Sprite(loader.resources["sauceTexture"].texture!)
		sauce.anchor.set(0.5);
		sauce.x = position.x;
		sauce.y = position.y;
		pixi.stage.addChild(sauce);
	}
}