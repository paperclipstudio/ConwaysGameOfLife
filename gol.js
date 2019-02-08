let alphabet = {
  none: [],
  a:[[1,1],[1,2],[1,4],[1,5]],
  b:[[1,1],[1,3]],
  c:[[1,1],[2,1],[1,2],[2,2],[1,3],[2,3]],
  d:[[1,1],[1,2],[3,0]],
  e:[[1,1],[2,1],[1,3],[2,3]],
  f:[[1,1],[2,1],[2,2],[1,3],[2,3],[1,4],[2,4]],
  r:[[1,1],[2,3],[1,4],[1,5]],

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
  this.unset = function(x,y) { this.cells[x][y] = false;};

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
    for ( let y=0; y<this.width; y++) {
      rowAsString = '';
      for ( let x=0; x<this.height; x++) {
        if (this.cells[x][y]) {
          rowAsString += String.fromCharCode(9608);
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
    for (let  x=0;x<this.width;x++) {
      for (let  y=0;y<this.height;y++) {
        this.cells[x][y] = (Math.random() < percent/100);
      };
    };
  }

  this.letter = function(char='r',offX=0,offY=0) {
    for (let  x=offX;x<3+offX;x++) {
      for (let  y=offY;y<6+offY;y++) {
        this.set(x,y)
      }
    };
    let boundUnset = this.unset.bind(this)
    let unsetArray = alphabet[char]||[[-1,-1]]
    unsetArray.forEach(
      function(entry) {
        boundUnset(entry[0]+offX,entry[1]+offY)
      }
    )
  };
  this.word =function(word="rebecca",offX=0,offY=0) {
    for (var i = 0; i < word.length; i++) {
      if (i*4+3 > this.width) { break}
      this.letter(word[i],i*4+offX,offY);
}
  }
};

module.exports =  Grid ;
