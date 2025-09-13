import { RangeList } from "../rangeList.js";

describe("Range list test cases", () => {
  test("Test case 1: adding and subtracting intensity", () => {
    const rl = new RangeList();
    rl.add(10, 30, 1);
    expect(rl.toArray()).toEqual([
      [10, 1],
      [30, 0],
    ]);
    rl.add(20, 40, 1);
    expect(rl.toArray()).toEqual([
      [10, 1],
      [20, 2],
      [30, 1],
      [40, 0],
    ]);
    rl.add(10, 40, -2);
    expect(rl.toArray()).toEqual([
      [10, -1],
      [20, 0],
      [30, -1],
      [40, 0],
    ]);
  });

  test("Test case 2: adding and subtracting intensity", () => {
    const rl = new RangeList();
    rl.add(10, 30, 1);
    expect(rl.toArray()).toEqual([
      [10, 1],
      [30, 0],
    ]);
    rl.add(20, 40, 1);
    expect(rl.toArray()).toEqual([
      [10, 1],
      [20, 2],
      [30, 1],
      [40, 0],
    ]);
    rl.add(10, 40, -2);
    expect(rl.toArray()).toEqual([
      [10, -1],
      [20, 0],
      [30, -1],
      [40, 0],
    ]);
  });

  test("Test case 3: overwriting intensity by setter", () => {
    const rl = new RangeList();
    rl.add(10, 50, 2);
    expect(rl.toArray()).toEqual([
      [10, 2],
      [50, 0],
    ]);
    rl.set(20, 40, 1);
    expect(rl.toArray()).toEqual([
      [10, 2],
      [20, 1],
      [40, 2],
      [50, 0],
    ]);
  });

  test("Test case 4: invalid ranges and zero amount throws error", () => {
    const rl = new RangeList();
    expect(() => rl.add(10, 50, 0)).toThrow("Invalid range or amount");
    expect(() => rl.add(10, 50, false)).toThrow("Invalid range or amount");
    expect(() => rl.add(10, 50, "a")).toThrow("Invalid range or amount");
    expect(() => rl.add(10, 50, null)).toThrow("Invalid range or amount");
    expect(() => rl.add(10, 50, undefined)).toThrow("Invalid range or amount");
  });
});
