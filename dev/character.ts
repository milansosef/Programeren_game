/// <reference path="gameObject.ts" />

class Character extends GameObject {

    constructor(){
        super("character", document.body, 400, 670, 61, 102);

        console.log("test");
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        // window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));
    }

    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.x -= this.width;
            console.log("up");
            break;
        case 68:
            this.x += this.width;
            break;
        case 87:
            this.y -= 30;
            // als helemaal boven in beeld, dan weer beneden zetten EN de score ophogen!!
            // if(this.y < -50) this.y = 670;
            break;
        case 83:
            this.y += 30;
            break;
        }
    }
    
    public update() : void {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}