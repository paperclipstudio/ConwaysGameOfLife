
function set(x,y)   { this.cells[x][y] = true;};
function unset(x,y) { this.cells[x][y] = false};
function count(x,y) {
  let number_of_neighbours = 0;
  for(let i = -1; i<=1; i++) {
    for(let j = -1; j<=1; j++) {
      // If we arn't looking at the center square
      // and we arn't looking out of bounds
      if (!(i === 0 && j === 0 || x+i < 0 || y+j < 0 ||
            x+i >= this.width || y+j >= this.height)){
        if (this.cells[x+i][y+j] === true) {
          number_of_neighbours++;
        };
      };
    };
  };
  return number_of_neighbours
}

function rules(my_state, neighbours) {


  if (neighbours < 2 || neighbours >= 4) {
    return false;
  }
  if (neighbours === 3) {
    return true;
  }
  if (neighbours === 4 || neighbours === 2) {
    return my_state;
  }
}



function Grid(height, width) {
  this.height = height;
  this.width = width;

// Fill Cells with a dead array.
  this.cells = [];
  for (let  i=0;i<height;i++) {
    this.cells.push([]);
    for (let  j=0;j<height;j++) {
      this.cells[i].push(false);
    };
  };

  this.set = function(x,y) { this.cells[x][y] = true;  };
  this.unset = function(x,y) { this.cells[x][y] = false};

// Count
  this.count = function (x,y) {
    let number_of_neighbours = 0;
    for(let i = -1; i<=1; i++) {
      for(let j = -1; j<=1; j++) {
        // If we arn't looking at the center square
        // and we arn't looking out of bounds
        if (!(i === 0 && j === 0 || x+i < 0 || y+j < 0 ||
              x+i >= this.width || y+j >= this.height)){
          if (this.cells[x+i][y+j] === true) {
            number_of_neighbours++;
          };
        };
      };
    };
    return number_of_neighbours
  };

// Next
  this.next = function() {
    let nextCells = [];
    for (let  i=0;i<this.width;i++) {
      nextCells.push([]);
      for (let  j=0;j<this.height;j++) {
        nextCells[i].push(false);
      };
    };
    for ( let x=0; x<this.width; x++) {
      for ( let y=0; y<this.height; y++) {
        nextCells[x][y] = rules(this.cells[x][y], this.count(x,y));
      };
    };
    this.cells = nextCells;
  };;

  // Print
  this.print = function () {
    let rowAsString = '  ';
    let gridAsString = '';
    for ( let x=0; x<this.width; x++) {
      rowAsString = '';
      for ( let y=0; y<this.width; y++) {
        if (this.cells[x][y]) {
          rowAsString += '#';
        } else {
          rowAsString += ' ';
        };
      };
      gridAsString += (rowAsString + "\n");
    };
    console.log(gridAsString);
  };


  // Random Fill
  this.fill = function (percent) {
    for (let  x=0;x<size;x++) {
      for (let  y=0;y<size;y++) {
        n.cells[x][y] = (Math.random() < percent/100);
      };
    };
  }
};

module.exports =  Grid ;
