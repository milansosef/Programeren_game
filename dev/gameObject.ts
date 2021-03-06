class GameObject {

    public div:HTMLElement;
    public x:number;
    public y:number;
    public width:number;
    public height:number;
    
    protected rect: ClientRect;

    constructor(tag:string, parent:HTMLElement, x:number, y:number, width:number, height:number) {
        this.div = document.createElement(tag);
        parent.appendChild(this.div);

        this.rect = this.div.getBoundingClientRect();

        this.x = this.rect.left;
        this.y = this.rect.top;
        this.width = width;
        this.height = height;
    }

    public update(){
        this.div.style.transform ="translate("+this.x+"px, "+this.y+"px)";
    }
}