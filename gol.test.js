let Grid = require("./gol.js");

let g = new Grid(4,4);

describe("Holds data grid of Cells", () => {
  it("starts blank", () => {
    expect(g.cells[2][2]).toBe(false);
    expect(g.cells[3][2]).toBe(false);
    expect(g.cells[0][3]).toBe(false);
  });
  it("Can have cells set" , () => {
    g.set(2,2);
    expect(g.cells[2][2]).toBe(true);
    g.set(2,4);
    expect(g.cells[2][4]).toBe(true);
    expect(g.cells[3][2]).toBe(false);
    expect(g.cells[2][0]).toBe(false);
    expect(g.cells[0][2]).toBe(false);
  });
  it("Can have cells unset" , () => {
    g.unset(2,2);
    expect(g.cells[2][2]).toBe(false);
    g.unset(2,4);
    expect(g.cells[2][4]).toBe(false);
  });
})
b = new Grid(4,4);
describe("Counts the number of set neigbours ", () => {
  it("Will count 0 when no neighbours", () => {
    expect(b.count(0,0)).toBe(0);
  });
  it("Will return the correct number of neigbours ", () => {
    b.set(0,0);
    expect(b.count(1,1)).toBe(1);
  });
  it("Is edge safe", () => {
    b.count(3,3);
    b.count(0,0);
    b.count(0,3);
    b.count(3,0);
  });
});

c = new Grid(3,3);
describe("Can evolve following the GoL rules.", () => {
  it("Will stay dead with empty grid", () => {
    c.next();
    expect(c.cells[1][0]).toBe(false);
    expect(c.cells[1][1]).toBe(false);
    expect(c.cells[0][0]).toBe(false);
    expect(c.cells[1][0]).toBe(false);
  });
  it("Will run a Blinker", () => {
    c.set(1,0);
    c.set(1,1);
    c.set(1,2);
    c.print();

    c.next();
    c.print();
    expect(c.cells[1][0]).toBe(false);
    expect(c.cells[0][0]).toBe(false);
    expect(c.cells[1][0]).toBe(false);
    expect(c.cells[1][0]).toBe(false);

    expect(c.cells[0][1]).toBe(true);
    expect(c.cells[1][1]).toBe(true);
    expect(c.cells[2][1]).toBe(true);
  });
});
