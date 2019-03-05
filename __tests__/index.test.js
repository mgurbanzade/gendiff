import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const findFixture = name => path.join(__dirname, '__fixtures__', name);
const expected = fs.readFileSync(findFixture('expected'), 'utf-8');
const sampleTitle = 'Calculate difference between two';

test(`${sampleTitle} JSON files`, () => {
  const file1 = findFixture('before.json');
  const file2 = findFixture('after.json');
  expect(gendiff(file1, file2)).toBe(expected);
});

test(`${sampleTitle} YAML files`, () => {
  const file1 = findFixture('before.yml');
  const file2 = findFixture('after.yml');
  expect(gendiff(file1, file2)).toBe(expected);
});

test(`${sampleTitle} files with different extensions`, () => {
  const file1 = findFixture('before.yml');
  const file2 = findFixture('after.json');
  expect(gendiff(file1, file2)).toBe(expected);
});
