/// <reference path="../gameObject.ts"/>
/// <reference path="../character.ts"/>

class Level implements View {
    public div:HTMLElement;
    private game:Game;
    private score:Score;

    private wind:Array<Wind> = new Array<Wind>();
    private intervalID: number; 
    public character:Character;
    private bridge:Bridge;

    constructor(g:Game){
        this.game = g;
        
        this.createLevel();
        this.score = new Score();
        this.bridge = new Bridge(this.div);
        this.character = new Character(this, this.div);

        this.intervalID = setInterval(()=> this.createWind(), 1400);

        requestAnimationFrame(() => this.gameLoop());
    }

    private createLevel(){
        this.div = document.createElement("level");
        this.game.container.appendChild(this.div);
    }

    private createWind():void {
        this.wind.push(new Wind(this, this.div));
    }

    public removeWind(w:Wind){
        let i:number = this.wind.indexOf(w);
        if(i != -1) {
            this.wind.splice(i, 1);
        }
    }

    private gameLoop(){
        let collision = false;
        for(let p of this.bridge.collidingparts){
            if(Util.checkCollision(p, this.character)){
                collision = true;
            } 
        }

        this.character.update();
        this.bridge.update();

        for(let c of this.wind){
            c.update();
        }

        if(collision){
            this.gameOver();
        } else {
            requestAnimationFrame(()=>this.gameLoop());
        }
    }

    public gameOver():void {
        clearInterval(this.intervalID);
        this.div.remove();
        this.character.removeMe();
        this.score.removeMe();

        let level = this;
        level = undefined;

        this.character = undefined;
        this.bridge = undefined;
        this.wind = undefined;

        let endscreen = new Endscreen(this.game, this.score);
        this.game.showView(endscreen);
    }

    public bridgeCrossed(){
        this.score.addScore(1);
        this.bridge.refreshParts();
    }
}
