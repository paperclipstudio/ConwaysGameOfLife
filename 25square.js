let Grid = require("./gol.js")

a = new Grid(25,50);
console.clear();
a.word("ham\nmath",3,1);
a.print();
setTimeout(() => {
  setInterval(() => {
    console.clear();
    a.print();
    a.next();
  }, 200)
}, 2000);
