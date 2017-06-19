class Score {
    private div:HTMLElement;
    private scoreCount:number = 0;

    constructor(){
        this.createDiv();

    }

    public addScore(n:number){
        this.scoreCount = this.scoreCount + n;
        this.div.innerHTML = "SCORE: " + this.scoreCount;
    }

    public getScore():number{
        return this.scoreCount;
    }

    private createDiv(){
        this.div = document.createElement("score");
        this.div.innerHTML = "SCORE: " + this.scoreCount;
        document.body.appendChild(this.div);

        this.div.style.transform = "translate("+20+"px, "+20+"px)";
    }

    public removeMe(){
        this.div.remove();
    }

}