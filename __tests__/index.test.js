import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const findFixture = name => path.join(__dirname, '__fixtures__', name);
const expected = fs.readFileSync(findFixture('expected'), 'utf-8');
const sampleTitle = 'Calculate difference between two';

test.each(['.json', '.yml', '.ini'])(
  `${sampleTitle} %s files`, i => expect(gendiff(findFixture(`before${i}`), findFixture(`after${i}`))).toBe(expected),
);

test(`${sampleTitle} files with different extensions`, () => {
  const file1 = findFixture('before.yml');
  const file2 = findFixture('after.json');
  expect(gendiff(file1, file2)).toBe(expected);
});

const crossExt = [
  ['.json', '.yml'],
  ['.yml', '.json'],
  ['.json', '.ini'],
  ['.ini', '.json'],
  ['.yml', '.ini'],
  ['.ini', '.yml'],
];

test.each(crossExt)(
  `${sampleTitle} files with extensions of %s and %s`, (ex1, ex2) => expect(gendiff(findFixture(`before${ex1}`), findFixture(`after${ex2}`))).toBe(expected),
);
