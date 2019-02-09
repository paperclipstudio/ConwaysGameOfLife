let Grid = require("./gol.js")

a = new Grid(25,50);
console.clear();
a.word("hello\nrebecca",3,1);
setInterval(() => {
  console.clear();
  a.print();
  a.next();

}, 200)
