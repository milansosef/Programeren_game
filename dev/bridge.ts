/// <reference path="gameObject.ts" />

class bridge extends GameObject {
    constructor() {
        super("character", document.body, 400, 670, 650, 960);

        this.setPosition();
    }

    setPosition() {
        this.x = window.innerWidth / 2 - this.rect.width / 2;
        //this.posY = window.innerHeight / 2 - this.rect.height / 2;

        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
    }
}