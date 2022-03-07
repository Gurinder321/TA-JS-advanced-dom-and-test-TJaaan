import add from './index';

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
test('adds 1 + 20 to equal 21', () => {
  expect(add(1, 20)).toBe(21);
});
test('adds 10 + 20 to not equal 21', () => {
  expect(add(10, 20)).not.toBe(21);
});
