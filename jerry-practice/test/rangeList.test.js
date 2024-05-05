// const RangeList = require('../dist');
import RangeList from '../src/rangeList';

test('Instantiate the RangeList', () => {
  const rangeList = new RangeList();

  expect(rangeList._ranges).toStrictEqual([]);
});

test('add function of RangeList', () => {
  const rangeList = new RangeList();
  rangeList.add([1, 5]);
  expect(rangeList._ranges).toStrictEqual([[1, 5]]);
  rangeList.add([10, 20]);
  expect(rangeList._ranges).toStrictEqual([
    [1, 5],
    [10, 20],
  ]);
  rangeList.add([20, 20]);
  expect(rangeList._ranges).toStrictEqual([
    [1, 5],
    [10, 20],
  ]);
  rangeList.add([20, 21]);
  expect(rangeList._ranges).toStrictEqual([
    [1, 5],
    [10, 21],
  ]);

  rangeList.add([2, 4]);
  expect(rangeList._ranges).toStrictEqual([
    [1, 5],
    [10, 21],
  ]);

  rangeList.add([3, 8]);
  expect(rangeList._ranges).toStrictEqual([
    [1, 8],
    [10, 21],
  ]);
});

test('remove function of RangeList', () => {
  const rangeList = new RangeList();
  rangeList.add([1, 8]);
  rangeList.add([10, 21]);

  rangeList.remove([10, 10]);
  expect(rangeList._ranges).toStrictEqual([
    [1, 8],
    [10, 21],
  ]);

  rangeList.remove([10, 11]);
  expect(rangeList._ranges).toStrictEqual([
    [1, 8],
    [11, 21],
  ]);

  rangeList.remove([15, 17]);
  expect(rangeList._ranges).toStrictEqual([
    [1, 8],
    [11, 15],
    [17, 21],
  ]);

  rangeList.remove([3, 19]);
  expect(rangeList._ranges).toStrictEqual([
    [1, 3],
    [19, 21],
  ]);
});

test('run RangeList', () => {
  const rl = new RangeList();
  rl.add([1, 5]);
  rl.print();
  // Should display: [1, 5)
  rl.add([10, 20]);
  rl.print();
  // Should display: [1, 5) [10, 20)
  rl.add([20, 20]);
  rl.print();
  // Should display: [1, 5) [10, 20)
  rl.add([20, 21]);
  rl.print();
  // Should display: [1, 5) [10, 21)
  rl.add([2, 4]);
  rl.print();
  // Should display: [1, 5) [10, 21)
  rl.add([3, 8]);
  rl.print();
  // Should display: [1, 8) [10, 21)
  rl.remove([10, 10]);
  rl.print();
  // Should display: [1, 8) [10, 21)
  rl.remove([10, 11]);
  rl.print();
  // Should display: [1, 8) [11, 21)
  rl.remove([15, 17]);
  rl.print();
  // Should display: [1, 8) [11, 15) [17, 21)
  rl.remove([3, 19]);
  rl.print();
  // Should display: [1, 3) [19, 21)
});
