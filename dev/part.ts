class Part {
    public div:HTMLElement;
    private bridge:Bridge;
    private parent:HTMLElement;

    private column:number;
    private row:number;

    public x:number;
    public y:number;
    public width:number;
    public height:number;

    public allowed:boolean;

    constructor(b:Bridge, p:HTMLElement, offset:number, row:number, column:number, allowed:boolean){
      this.bridge = b;
      this.parent = p;
      this.row = row;
      this.column = column;
      this.width = 125;
      this.height = 100;
      this.x = (column * 125) + offset + 77;
      this.y = row * 100;
      this.allowed = allowed;

      this.createDiv();

      this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
    }

    private createDiv(){
      if(this.row%2 == 0){
          this.allowed = true;
      }

      if(this.allowed){
        this.div = document.createElement("filledpart");
        this.parent.appendChild(this.div);
      } else {
        this.div = document.createElement("brokenpart");
        this.parent.appendChild(this.div);
      }
    }
}
