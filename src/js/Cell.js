/**
 * Created by zura on 3/11/2019.
 */
export default class Cell{
  constructor(puzzle, ind){

    this.isEmpty = false;
    this.index = ind;
    this.puzzle = puzzle;
    this.width = this.puzzle.width / this.puzzle.dimmension;
    this.height = this.puzzle.height / this.puzzle.dimmension;

    this.el = this.createDiv();
    puzzle.el.appendChild(this.el);

    if (this.index === this.puzzle.dimmension * this.puzzle.dimmension - 1){
      this.isEmpty = true;
      return;
    }
    this.setImage();
    this.setPosition(this.index);
  }

  createDiv(){
    const div = document.createElement('div');
    div.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.height}px`;
    div.style.border = '1px solid #FFF';
    div.style.position = 'absolute';
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;

    div.onclick = () => {
      console.log("Click ", this.index, );
      console.log("Empty index ", );

      const currentCellIndex = this.puzzle.findPosition(this.index);
      const emptyCellIndex = this.puzzle.findEmpty();
      const {x, y} = this.getXY(currentCellIndex);
      const {x: emptyX, y: emptyY} = this.getXY(emptyCellIndex);
      // console.log(x, y);
      // console.log(emptyX, emptyY);
      if ((x === emptyX || y === emptyY) &&
        (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)){
        // console.log("I can swap");
        this.puzzle.swapCells(currentCellIndex, emptyCellIndex);
      }
    };

    return div;
  }

  setImage(){
    const {x, y} = this.getXY(this.index);
    const left = this.width * x;
    const top = this.height * y;

    this.el.style.backgroundImage = `url(${this.puzzle.imageSrc})`;
    this.el.style.backgroundPosition = `-${left}px -${top}px`;
  }

  setPosition(index){
    const {left, top} = this.getPositionFromIndex(index);

    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }

  getPositionFromIndex(index){
    const {x, y} = this.getXY(index);
    return {
      left: this.width * x,
      top: this.height * y
    }
  }

  getXY(index){
    return {
      x: index % this.puzzle.dimmension,
      y: Math.floor(index / this.puzzle.dimmension)
    }
  }
}