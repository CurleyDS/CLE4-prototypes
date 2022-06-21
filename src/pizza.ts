import * as PIXI from "pixi.js"
import sauceImage from './images/sauce.png'
import { Sauce } from "./sauce"

export class Pizza extends PIXI.Sprite {
    
    loader:PIXI.Loader;
    hitbox:PIXI.Circle;
	drawPosition:any = null;
	drawingStarted:boolean = false;
	sauce:Sauce[] = [];

    constructor(texture: PIXI.Texture, width:any, height:any) {
        
        super(texture);
		this.anchor.set(0.5);
		this.width = height / 2;
		this.height = height / 2;
		this.position.set(width / 2, height / 2);
		this.interactive = true;
        this.hitbox = new PIXI.Circle(0, 0, (this.width / 2));
        
		const onDown = (e:any) => {
			const position = this.toLocal(e.data.global);
			position.x;
			position.y;

			if (this.insideBorder(position)) {
                this.drawPosition = position;
				this.drawingStarted = true;
			}
		}

		const onMove = (e:any) => {
			if (this.drawingStarted) {
				const position = this.toLocal(e.data.global);
				position.x;
				position.y;

				if (this.insideBorder(position)) {
					this.drawPosition = position;
				} else {
					this.drawingStarted = false;
				}
			}
		}

		const onUp = (e:any) => {
			this.drawingStarted = false;
		}

		this.on('mousedown', onDown);
		this.on('touchstart', onDown);
		this.on('mousemove', onMove);
		this.on('touchmove', onMove);
		this.on('mouseup', onUp);
		this.on('touchend', onUp);

        this.loader = new PIXI.Loader();
		this.loader.add('sauceTexture', sauceImage); // laadt de images in de variabelen uit de import
		this.loader.load(() => {});
    }
    
	insideBorder(position:any) {
		if (position != null) {
			const bounds = this.hitbox;
	
			let distance = (bounds.x - position.x) * (bounds.x - position.x) + (bounds.y - position.y) * (bounds.y - position.y);
			let radius = bounds.radius * bounds.radius;
			if (distance < radius) {
				return true;
			}
			return false;
		}
	}

    public update(delta:number) {
        if (this.insideBorder(this.drawPosition)) {
            if (this.drawingStarted) {
                let sauce = new Sauce(this.loader.resources["sauceTexture"].texture!, this.drawPosition)
                this.addChild(sauce);
				this.sauce.push(sauce);
			}
		}
    }
}