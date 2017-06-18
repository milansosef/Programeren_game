class Car {

    private speed: number = 0;
    private game: Game;

    public div: HTMLElement;
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(g:Game) {
        this.div = document.createElement("car");
        document.body.appendChild(this.div);

        this.game = g;

        this.x = -168;
        this.y = Math.ceil(Math.random() * 5) * 110;
        this.width = 168;
        this.height = 108;
        this.speed = Math.random() * 2 + 2;
        this.setColor();
        this.update();
    }

    public update(): void {
        this.x += this.speed;
        if (this.x > window.innerWidth) {
            console.log("Auto uit beeld: " + this.x);
            // 1 - verwijder het div element van deze car uit de DOM
            // this.div.remove();
            // 2 - verwijder deze instance uit de cars array in level.ts
            // this.level.removeCar(this);
        }

        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    private setColor() {
        let color:number = Math.random()*360; 
        this.div.style.webkitFilter = "hue-rotate("+color+"deg)";
        this.div.style.filter = "hue-rotate("+color+"deg)";
    }

}