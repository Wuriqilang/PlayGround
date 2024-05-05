// A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100,201)

class RangeList {
  _ranges; // Array<[number,number]>

  constructor() {
    this._ranges = [];
  }

  /**
   * prints the RangeList content
   */
  print() {
    const res = [];
    for (let item of this._ranges) {
      res.push(`[${item[0]},${item[1]})`);
    }
    console.log(res.join(' '));
  }

  handleException(range) {
    if (isNaN(range[0]) || isNaN(range[1])) {
      throw new Error('RangeList requires an array of parameters');
    } else if (range.length > 2) {
      throw new Error('RangeList requires an array of length 2 as an argument');
    } else if (range[0] > range[1]) {
      throw new Error('The range interval is incorrect');
    }
  }

  /**
   *  Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    this.handleException(range);

    let [inputStart, inputEnd] = range;

    for (let i = 0; i < this._ranges.length; i++) {
      let [subRangeStart, subRangeEnd] = this._ranges[i];
      // Example  rangeList:[5,10) [20,25)   input: [1,4]
      if (inputEnd < subRangeStart) {
        this._ranges.splice(i, 0, range);
        return;
      }
      // Example  rangeList:[5,10) [20,25)   input: [3,8]
      if (inputStart <= subRangeEnd) {
        // generate new Range
        let newRange = [Math.min(inputStart, subRangeStart), Math.max(inputEnd, subRangeEnd)];
        // delete current subRange
        this._ranges.splice(i, 1);
        this.add(newRange);
        return;
      }
    }

    // if inputstart > rangeEnd
    this._ranges.push(range);
  }

  /**
   * Removes a range frome the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    this.handleException(range);

    let [inputStart, inputEnd] = range;
    let newRanges = [];

    for (let i = 0; i < this._ranges.length; i++) {
      let [subRangeStart, subRangeEnd] = this._ranges[i];

      // Example  rangeList:[5,10) [20,25)   input: [8,14]
      if (inputStart > subRangeStart && inputStart < subRangeEnd) {
        const newRange = [subRangeStart, inputStart];
        newRanges.push(newRange);
      }

      // Example  rangeList:[5,10) [20,25)   input: [2,9]
      if (inputEnd < subRangeEnd && inputEnd > subRangeStart) {
        const newRange = [inputEnd, subRangeEnd];
        newRanges.push(newRange);
      }

      // Example  rangeList:[5,10) [20,25)   input: [12,14]
      if (inputStart >= subRangeEnd || inputEnd <= subRangeStart) {
        newRanges.push(this._ranges[i]);
      }
    }

    this._ranges = newRanges;
  }
}

export default RangeList;
