/// <reference path="gameObject.ts" />
/// <reference path="part.ts" />

class Bridge extends GameObject {
    public collidingparts:Array<Part>;
    public parts:Array<Part>;
    public part:Part;
    private passable: boolean;
    private parent: HTMLElement;

    // private level: Level;

    constructor(parent: HTMLElement) {
        super("bridge", parent, 0, 0, 650, 960);

        this.parent = parent;

        this.setPosition();
        this.createParts();
    }

    private setPosition() {
        this.x = window.innerWidth / 2 - 325;
        this.div.style.transform ="translate("+this.x+"px, "+this.y+"px)";
        // this.update();
    }

    public createParts(){
        this.parts= new Array<Part>();
        this.collidingparts = new Array<Part>();

        for(let row = 0; row<7; row++){
            this.passable = false;

            while(this.passable == false){
                for (let column = 0; column < 4; column++) {
                    // this.parts.push(new Part(this, row, column));
                    // this.parts.push(new Part(this, row, column, 125, 23 +(100 * row)));
                    let p = new Part(this, this.parent, this.x, row, column);
                    this.parts.push(p);

                    if (p.allowed == 1){
                         this.passable = true;
                    }

                    if (p.allowed == 0){
                         this.collidingparts.push(p);
                    }
                
                }
            }
        }
    }

    public removePart(p: Part) {
        // div en listeners verwijderen
        p.div.remove();

        // ball instance verwijderen uit de array
		// let i : number = this.collidingparts.indexOf(p);
		// if(i != -1) {
		// 	this.collidingparts.splice(i, 1);
		// }
		// console.log("Aantal is " + this.collidingparts.length);
	}
}