import {
  add,
  almostEqual,
  calcSlope,
  multiply,
} from "~/utils/other/for-test/cart-calc";

describe("test calculation helpers", () => {
  describe("test add function", () => {
    it("wallaby.js: adds two numbers", () => {
      expect(add(1, 2)).toBe(3);
    });

    it("add two numbers", () => {
      const a = 1;
      const b = 2;
      const output = add(a, b);
      expect(output).toEqual(3);
    });
  });

  describe("test multiply function", () => {
    it("wallaby.js: multiplies two numbers", () => {
      expect(multiply(2, 3)).toBe(6);
    });

    it("multiply two numbers", () => {
      const a = 1;
      const b = 2;
      const output = multiply(a, b);
      expect(output).toEqual(2);
    });
  });

  describe("test almostEqual function", () => {
    it("almost equal with equal numbers", () => {
      const a = 0;
      const b = 0;
      const output = almostEqual(a, b);
      expect(output).toEqual(false);
    });

    it("almost equal with different numbers", () => {
      const a = "0";
      const b = "1";
      const output = almostEqual(a, b);
      expect(output).toEqual(false);
    });

    it("almost equal with almost equal numbers", () => {
      const a = Number("1.0000000000000001");
      const b = Number("1.00000000000000015");
      const output = almostEqual(a, b);
      expect(output).toEqual(true);
    });
  });

  describe("test calcSlope function", () => {
    it("no slop as same points", () => {
      const a = { x: 0, y: 0 };
      const b = { x: 0, y: 0 };
      const output = calcSlope(a.x, a.y, b.x, b.y);
      expect(output).toEqual(0);
    });

    it("has slop", () => {
      const a = { x: 0, y: -1 };
      const b = { x: 1, y: 2 };
      const output = calcSlope(a.x, a.y, b.x, b.y);
      expect(output).toEqual(3);
    });
  });
});
