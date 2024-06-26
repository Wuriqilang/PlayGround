import RangeList from './rangeList';

const rl = new RangeList();

rl.add([1, 5]);
rl.print();
console.log(`Should display: [1, 5)`);
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
console.log(`Should display: [1, 5) [10, 20)`);
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
console.log(`Should display: [1, 5) [10, 20)`);
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
console.log(`Should display: [1, 5) [10, 21)`);
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
console.log(`Should display: [1, 5) [10, 21)`);
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
console.log(`Should display: [1, 8) [10, 21)`);
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
console.log(`Should display: [1, 8) [10, 21)`);
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
console.log(`Should display: [1, 8) [11, 21)`);
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
console.log(`Should display: [1, 8) [11, 15) [17, 21)`);
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
console.log(`Should display: [1, 3) [19, 21)`);
// Should display: [1, 3) [19, 21)

export default RangeList;
