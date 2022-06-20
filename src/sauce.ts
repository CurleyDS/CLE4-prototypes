import * as PIXI from "pixi.js"

export class Sauce extends PIXI.Sprite {
    
    constructor(texture: PIXI.Texture, position:any) {
        super(texture)
        this.anchor.set(0.5);
        this.x = position.x;
        this.y = position.y;
    }

    public update(delta:number) {
        if (this.y <= 0) {
            this.y = 450
        } else {
            this.y -= 5 * delta
        }
    }
}