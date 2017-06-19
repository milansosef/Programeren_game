/// <reference path="gameObject.ts" />

class Character extends GameObject {
    private level: Level;

    private callback:EventListener;

    constructor(l:Level, parent: HTMLElement){
        super("character", parent, 400, 670, 61, 102);

        this.level = l;
        this.setPosition();

        this.callback = (e:KeyboardEvent) => this.onKeyDown(e);
        window.addEventListener("keydown", this.callback);
    }

    setPosition(){
        this.x = window.innerWidth / 2 - 61/2 + 125/2;
        this.y = window.innerHeight - 102 + 35;
    }

    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.x -= 125;
            if(this.x < 550) this.level.gameOver();
            break;
        case 68:
            this.x += 125;
            if(this.x > 925) this.level.gameOver();
            break;
        case 87:
            this.y -= 100;
            if(this.y < -50){
                this.y = 670;
                this.level.bridgeCrossed();
            } 
            break;
        case 83:
            this.y += 100;
            if(this.y > 670) this.y = 670; 
            break;
        }
    }

    public removeMe():void {
        this.div.remove();
        window.removeEventListener("keydown", this.callback);
    }
}