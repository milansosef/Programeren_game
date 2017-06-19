class Endscreen implements View {
    private game: Game;
    private gameOver: HTMLElement;
    private button:HTMLElement;
    private scoreDiv: HTMLElement;
    private score: Score;
    
    constructor(g:Game, s:Score) {    
        this.game = g;
        this.score = s;

        this.createGameOver();
        this.createScore();
        this.createButton();
    }

    private createGameOver(){
        this.gameOver = document.createElement("score");
        this.gameOver.innerHTML = "GAME OVER";
        document.body.appendChild(this.gameOver);

        let gameOverX = window.innerWidth/2 - 150;
        let gameOverY = window.innerHeight/2 - 100;

        this.gameOver.style.transform = "translate("+gameOverX+"px, "+gameOverY+"px)";
    }

    private createScore(){
        this.scoreDiv = document.createElement("score");
        this.scoreDiv.innerHTML = "Your score: " + this.score.getScore();
        document.body.appendChild(this.scoreDiv);

        let scoreDivX = window.innerWidth/2 - 150;
        let scoreDivY = window.innerHeight/2;

        this.scoreDiv.style.transform = "translate("+scoreDivX+"px, "+scoreDivY+"px)";
    }

    private createButton(){
        this.button = document.createElement("button");
        document.body.appendChild(this.button);

        TweenLite.set(this.button, {x: window.innerWidth/2 - 345/2, y: -230});
        TweenLite.to(this.button, 1, {y: window.innerHeight/2 + 131/2, ease:Bounce.easeOut});

        this.button.addEventListener("click", (e: MouseEvent)=> this.startGame(e));
    }

    private startGame(e: MouseEvent){
        this.button.remove();
        this.gameOver.remove();
        this.scoreDiv.remove();

        let level = new Level(this.game); 
        this.game.showView(level);
    }
}