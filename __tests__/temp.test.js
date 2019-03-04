import sum from '../src/temp';

test('sum', () => {
  expect(sum(1, 2, 3, 4, 5)).toBe(15);
});
