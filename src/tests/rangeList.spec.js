import { hello } from "../rangeList.js";

describe("RangeList", () => {
  it("should return Hello Jerry!", () => {
    expect(hello()).toBe("Hello Jerry!");
  });
});
