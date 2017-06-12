/// <reference path="gameObject.ts"/>
/// <reference path="character.ts"/>

class Game {
    public div:HTMLElement;
    private passable: boolean;

    private objects:Array<GameObject>;
    private parts:Array<Part>;
    private character:Character;

    constructor(){
        this.createParts();
        this.objects = new Array<GameObject>();
        this.character = new Character();

        requestAnimationFrame(() => this.gameLoop());
    }

    createParts(){
        for(let row = 0; row<6; row++){
            this.passable = false;

            while(this.passable == false){
                for (let column = 0; column < 4; column++) {
                    let p = new Part(row, column);
                    if (p.allowed == 1){
                         this.passable = true;
                    }
                }
            }
        }
    }

    gameLoop(){
        this.character.update();

        for(let o of this.objects){
            o.update();
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}

