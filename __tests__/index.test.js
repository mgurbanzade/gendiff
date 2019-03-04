import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const findFixture = name => path.join(__dirname, '__fixtures__', name);

test('', () => {
  const file1 = findFixture('before.json');
  const file2 = findFixture('after.json');
  const expected = fs.readFileSync(findFixture('expected'), 'utf-8');
  expect(gendiff(file1, file2)).toBe(expected);
});
