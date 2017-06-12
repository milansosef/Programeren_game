class Part {

    private column:number;
    private row:number;
    public allowed:number;
    public x:number;
    public y:number;
    public width:number;
    public height:number;

    constructor(row:number, column:number){
      this.row = row;
      this.column = column;

      let div = document.createElement("div");
      document.body.appendChild(div);

      if(this.row%2 == 0){
          this.allowed = 1;
      } else {
        this.allowed = Math.round(Math.random());
      }
      
      // this.allowed = Math.round(Math.random());

      div.className = (this.allowed) ? "filledpart" : "brokenpart";
      
      this.x = column * 125;
      this.y = row * 100;

      div.addEventListener("click", ()=>this.partClicked());

      div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
    }

    public partClicked(){
      console.log("row: " + this.row + " column: " + this.column);
      console.log(this.allowed);
    }
}
