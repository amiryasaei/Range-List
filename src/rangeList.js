class RangeList {
  constructor() {
    /**
     * Definine nodes and segments as a map to have something like
     * {
     *  10 => 1,
     *  30 => 0
     * }
     * This way we can get and set our data in O(1)
     */
    this.segments = new Map();
  }

  /**
   * Adding new range to the existing segment map
   * @param {number} from - The start of the segment
   * @param {number} to - The end of the segment
   * @param {number} amount - The amount to add to the intensity for the segment
   */
  add(from, to, amount) {
    // Validate inputs to reject invalid ranges and values
    if (
      !Number.isFinite(from) ||
      !Number.isFinite(to) ||
      !Number.isInteger(amount) ||
      amount === 0 ||
      from >= to
    ) {
      throw new Error("Invalid range or amount");
    }
    //get the segments and if not available, set to 0
    const fromSegment = this.segments.get(from) || 0;
    const toSegment = this.segments.get(to) || 0;

    // set the segments using the map setter not our own setter
    this.segments.set(from, fromSegment + amount);
    this.segments.set(to, toSegment - amount);
  }

  /**
   * Convert the segment map to an array of [node, intensity]
   * @returns {Array} - An array of [node, intensity]
   */
  toArray() {
    let entries = Array.from(this.segments.entries());

    // Sort by the position (from smallest to largest)
    entries.sort((entry1, entry2) => {
      if (entry1[0] < entry2[0]) return -1; // entry1 comes before entry2
      if (entry1[0] > entry2[0]) return 1; // entry2 comes before entry1
    });

    let result = [];
    let intensity = 0;

    // Traverse through the entries and update the intensity
    for (let i = 0; i < entries.length; i++) {
      let position = entries[i][0];
      let currentIntensity = entries[i][1];

      // update intensity
      intensity += currentIntensity;

      // only add to result if result is empty OR intensity has changed
      if (result.length === 0 || result[result.length - 1][1] !== intensity) {
        result.push([position, intensity]);
      }
    }

    return result;
  }
  /**
   * setting new intensity for a segment
   * @param {number} from - The start of the segment
   * @param {number} to - The end of the segment
   * @param {number} amount - The amount to set the intensity for the segment
   */
  set(from, to, amount) {
    // validate inputs to reject invalid ranges and values
    if (
      !Number.isFinite(from) ||
      !Number.isFinite(to) ||
      !Number.isInteger(amount) ||
      from >= to
    ) {
      throw new Error("Invalid range or amount");
    }

    // sorting the segment object by converting to array to have this format : [[_,_],[_,_]]
    const segments = this.toArray();
    let currentIntensity = 0;

    // find intensity value before the 'from' node
    for (let [pos, intensity] of segments) {
      if (pos >= from) break;
      currentIntensity = intensity;
    }

    // clear existing intensities by adding the negative of current intensity
    if (currentIntensity !== 0) {
      this.add(from, to, -currentIntensity);
    }

    // set the new intensity to 'amount'
    if (amount !== 0) {
      this.add(from, to, amount);
    }
  }
}

export { RangeList };
