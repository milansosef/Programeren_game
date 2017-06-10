class GameObject {

    public div:HTMLElement;
    public x:number;
    public y:number;
    public width:number;
    public height:number;
            
    constructor(tag:string, parent:HTMLElement, x:number, y:number, width:number, height:number) {
        this.div = document.createElement(tag);
        parent.appendChild(this.div);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public update(){
        this.div.style.transform ="translate("+this.x+"px, "+this.y+"px)";
    }
}

//Example object
// class Car extends GameObject {
//     private speed:number;
//     constructor(){
//         super("car", document.body);
//         this.x = 100;
//         this.y = 200;
//     }
// }