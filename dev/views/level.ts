/// <reference path="../gameObject.ts"/>
/// <reference path="../character.ts"/>

class Level implements View {
    public div:HTMLElement;
    private score:number;
    private game:Game;

    private cars:Array<Car> = new Array<Car>();
    public character:Character;
    private bridge:Bridge;

    constructor(g:Game){
        this.game = g;
        this.score = 0;

        this.createLevel();
        setInterval(()=> this.createCar(), 1400);

        requestAnimationFrame(() => this.gameLoop());
    }

    private createCar():void {
        //this.cars.push(new Car(this));
        // console.log("aantal autos: " + this.cars.length);
    }

    private createLevel(){
        this.div = document.createElement("level");
        this.game.container.appendChild(this.div);

        this.bridge = new Bridge(this.div);
        this.character = new Character(this, this.div);
    }

    private gameLoop(){
        let collision = false;
        for(let p of this.bridge.collidingparts){
            if(Util.checkCollision(p, this.character)){
                // console.log("Collision detected");
                p.div.style.opacity = 0.2.toString();
                collision = true;
            } else {
                // console.log("no collision");
                p.div.style.opacity = 1 + "";
            }
        }

        this.character.update();
        this.bridge.update();

        for(let c of this.cars){
            c.update();
        }

        if(collision){
            this.gameOver();
        } else {
            requestAnimationFrame(()=>this.gameLoop());
        }
    }

    public gameOver():void {
        // clearInterval(this.intervalID);
        
        this.div.remove();
        this.character.removeMe();

        let score = new Score(this.game, this.score);
        this.game.showView(score);
    }

    public scoreCount(){
        this.score++;
        console.log("Scored! Score = " + this.score);

        for(let i=0; i<this.bridge.parts.length; i++){
            let p = this.bridge.parts[i];
            this.bridge.removePart(p);
        }

        this.bridge.parts = [];
        this.bridge.createParts();
    }
}
