class Kaleidoscope {
  constructor() {
    this.board = document.querySelector('#board');
    this.option = {
      color: ['#3f51b5', '#ffc107', '#2ef321', '#f90505', '#2196F3', '#673ab7'],
      size: [13, 16, 20, 25, 30, 35, 40, 45, 50],
      cells: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
    }
    this.lastNumber = 1;
    
    this.init();
  }
  init = () => {
    this.draw();
    this.board.addEventListener('click', this.pickNumber);
  }
  draw() {
    function compareRandom(a, b) { 
      return Math.random() - 0.5; 
    }
    this.option.cells.sort(compareRandom);

    for(let i = 0; i < this.option.cells.length; i++) {
      const randColor = Math.floor(Math.random() * this.option.color.length);
      const randSize = Math.floor(Math.random() * this.option.size.length);

      this.board.innerHTML += `
        <div class="cell" 
        style="
        color: ${this.option.color[randColor]}; 
        font-size: ${this.option.size[randSize]}px">
        ${this.option.cells[i]}
        </div>
      `;
    }
  }
  refreshGame() {
    this.board.innerHTML = '';
    this.draw();
  }
  finishTheGame() {
    alert('Конец игры');
    
    this.lastNumber = 1;
    
    this.refreshGame();
  }
  pickNumber = (event) => {
    const target = event.target;
    
    if(!target.closest('.cell')) return false;
    
    if(target.innerHTML.trim() == this.lastNumber) {
      if(!target.hasAttribute('data-busy')) {
        this.lastNumber++;
        
        target.setAttribute('data-busy', true);
        target.innerHTML = '<img src="icons/check.svg" alt="">';
      }
    }
    // game over
    if(this.lastNumber > this.option.cells.length) {
      this.finishTheGame();
    };
  }
}
const kaleidoscope = new Kaleidoscope();