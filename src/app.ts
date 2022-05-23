// import files
import * as PIXI from 'pixi.js'

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
loader.load(()=>loadCompleted())

// after loading is complete
function loadCompleted() {
    const sprite = new PIXI.Sprite(renderTexture);
    sprite.anchor.set(0.5);
    sprite.width = pixi.screen.height / 2;
    sprite.height = pixi.screen.height / 2;
    sprite.position.set(pixi.screen.width / 2, pixi.screen.height / 2);
    sprite.interactive = true;
    pixi.stage.addChild(sprite);
}

function drawPoint(x, y) {
	const sprite = spritePool.get(); // you can create a new sprite or use one from the pool, see live example sources below
	sprite.x = x;
	sprite.y = y;
	sprite.texture = brushTexture; // texture for single point, see explanation below

	if (useEraser) {
		sprite.filter = new PIXI.filters.AlphaFilter();
		sprite.blendMode = PIXI.BLEND_MODES.ERASE;
	} else {
		sprite.blendMode = PIXI.BLEND_MODES.NORMAL;
	}

	drawBuffer.addChild(sprite);
}

function renderPoints() {
	pixi.renderer.render(drawBuffer, renderTexture, false); // render all sprites from drawBuffer to renderTexture without clearing it

	drawBuffer.children = []; // when all sprites are rendered we can clear drawBuffer
}

function drawPointLine(oldPos, newPos) {
	const delta = {
		x: oldPos.x - newPos.x,
		y: oldPos.y - newPos.y
	};
	const deltaLength = Math.sqrt(delta.x ** 2 + delta.y ** 2);

	drawPoint(newPos.x, newPos.y);

	if (deltaLength >= brushSize / 8) {
		const additionalPoints = Math.ceil(deltaLength / (brushSize / 8));

		for (let i = 1; i < additionalPoints; i++) {
			const pos = {
				x: newPos.x + delta.x * (i / additionalPoints),
				y: newPos.y + delta.y * (i / additionalPoints),
			};

			drawPoint(pos.x, pos.y);
		}
	}
}

const onDown = (e) => {
    const position = sprite.toLocal(e.data.global);
    position.x += 512; // canvas size is 1024x1024, so we offset the position by the half of its resolution
    position.y += 512;

    lastPosition = position;
    drawingStarted = true;
};

const onMove = (e) => {
    const position = sprite.toLocal(e.data.global);
    position.x += 512;
    position.y += 512;

    if (drawingStarted) {
        drawPointLine(lastPosition, position)
    }

    lastPosition = position;
};

const onUp = (e) => {
    drawingStarted = false;
};

pixi.ticker.add(() => {
    renderPoints();
});

sprite.on('mousedown', onDown);
sprite.on('touchstart', onDown);
sprite.on('mousemove', onMove);
sprite.on('touchmove', onMove);
sprite.on('mouseup', onUp);
sprite.on('touchend', onUp);
