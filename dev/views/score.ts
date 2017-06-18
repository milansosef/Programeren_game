class Score implements View {

    private game: Game;
    public div: HTMLElement;
    private button:HTMLElement;
    private score:number;
    
    constructor(g:Game, s:number) {    
        this.game = g;
        this.score = s;
        this.createButton();

        console.log("Game over newb");
        console.log("Score: " + this.score);

        this.div = document.createElement("start");
        g.container.appendChild(this.div);

        // TODO TOON HIER DE HISCORE LIJST

        // TODO VOEG HIER EEN RESTARTBUTTON TOE

        // TODO ANIMEER DE LIJST EN DE START BUTTON MET TWEENLITE

        // TODO ONCLICK: GAME SHOWVIEW(LEVEL)
        // this.game.showView(new Level(this.game)); 
    }

    private createButton(){
        this.button = document.createElement("button");
        document.body.appendChild(this.button);

        TweenLite.set(this.button, {x:550, y:-230});
        TweenLite.to(this.button, 1, {y:300, ease:Bounce.easeOut});

        this.button.addEventListener("click", (e: MouseEvent)=> this.startGame(e));
    }

    private startGame(e: MouseEvent){
        this.button.remove();

        let level = new Level(this.game); 
        this.game.showView(level);
    }
}