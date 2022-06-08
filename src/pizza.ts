import * as PIXI from "pixi.js"

export class Pizza extends PIXI.Sprite {
    
    public hitbox:PIXI.Circle

    constructor(texture: PIXI.Texture, width:any, height:any) {
        super(texture);
		this.anchor.set(0.5);
		this.width = height / 2;
		this.height = height / 2;
		this.position.set(width / 2, height / 2);
		this.interactive = true;
        this.hitbox = new PIXI.Circle(0, 0, (this.width / 2));
    }
    
    public update(delta:number) {
        if (this.y <= 0) {
            this.y = 450;
        } else {
            this.y -= 5 * delta;
        }
    }
}