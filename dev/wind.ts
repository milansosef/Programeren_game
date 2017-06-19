class Wind extends GameObject{

    private level: Level;
    private speed: number = 0;

    constructor(l:Level, parent:HTMLElement) {
        super("wind", parent, -168, Math.ceil(Math.random() * 5) * 110, 168, 108);
        this.level = l;

        this.y = Math.ceil(Math.random() * 5) * 110;
        this.speed = Math.random() * 2 + 2;

        this.update();
    }

    public update(): void {
        this.x += this.speed;
        if (this.x > window.innerWidth - 50) {
            this.removeMe();
        }

        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }

    public removeMe(){
            this.div.remove();
            this.level.removeWind(this);
    }
}