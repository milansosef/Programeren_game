/// <reference path="gameObject.ts" />
/// <reference path="part.ts" />

class Bridge extends GameObject {
    private parent: HTMLElement;

    private parts:Array<Part>;
    private part:Part;
    public collidingparts:Array<Part>;  

    constructor(parent: HTMLElement) {
        super("bridge", parent, 0, 0, 650, 960);

        this.parent = parent;

        this.setPosition();
        this.createParts();
    }

    private setPosition() {
        this.x = window.innerWidth / 2 - 325;
        this.div.style.transform ="translate("+this.x+"px, "+this.y+"px)";
    }

    public createParts(){
        this.parts = new Array<Part>();
        this.collidingparts = new Array<Part>();

        for(let row = 0; row<7; row++){
            let currentPassables = [];

            for (let column = 0; column < 4; column++) {
                let state:boolean = Boolean((Math.floor(Math.random() * 100)) % 2 == 0);
                currentPassables.push(state);
                if (column == 3 && currentPassables.indexOf(true) == -1){
                    state = true;
                }

                let p = new Part(this, this.parent, this.x, row, column, state);
                this.parts.push(p);
                
                if (p.allowed == false){
                    this.collidingparts.push(p);
                }
            }
        }
    }

    public refreshParts(){
        for(let i=0; i<this.parts.length; i++){
            let p = this.parts[i];
            this.removePart(p);
        }

        this.parts = [];

        for(let i=0; i<this.collidingparts.length; i++){
            let p = this.collidingparts[i];
            this.removePart(p);
        }

        this.collidingparts = [];

        this.createParts();
    }

    public removePart(p: Part) {
        p.div.remove();
	}
}