class Start implements View {
    private game: Game;
    
    public div: HTMLElement;
    private button:HTMLElement;

    constructor(g:Game){
        this.game = g;
        this.createButton();
    }

    private createButton(){
        this.button = document.createElement("button");
        document.body.appendChild(this.button);

        TweenLite.set(this.button, {x: window.innerWidth/2 - 345/2, y: -230});
        TweenLite.to(this.button, 1, {y: window.innerHeight/2 - 131/2, ease:Bounce.easeOut});

        this.button.addEventListener("click", (e: MouseEvent)=> this.startGame(e));
    }

    private startGame(e: MouseEvent){
        this.button.remove();

        let level = new Level(this.game); 
        this.game.showView(level);
    }
}