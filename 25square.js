let Grid = require("./gol.js")

a = new Grid(50,25);

a.word("rebecca",0,5);
a.print();
setInterval(() => {

  console.clear()
  a.print();
  a.next();

}, 500)
