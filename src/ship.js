class Ship {
  constructor(name,length){
    this.name = name;
    this.length = length;
    let x = [];
    for(let i=0;i<length;i++){
      x.push(false);
    }
    this.hitBox = x;
    this.inSquares = [];
  }

  hit(position) {
    this.hitBox[position] = true;
  }

  isSunk() {
    return this.hitBox.every(val => {return val == true});
  }
}



export { Ship };
