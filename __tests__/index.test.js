import fs from 'fs';
import path from 'path';
import gendiff from '../src';

describe('Calculate difference between two files', () => {
  const findFixture = name => path.join(__dirname, '__fixtures__', name);

  test.each(['.json', '.yml', '.ini'])(
    'with extensions of %s', (i) => {
      const firstFilePath = findFixture(`before${i}`);
      const secondFilePath = findFixture(`after${i}`);
      const expected = fs.readFileSync(findFixture('expected'), 'utf-8');
      expect(gendiff(firstFilePath, secondFilePath)).toBe(expected);
    },
  );

  test.each(['.json', '.yml', '.ini'])(
    'with extensions of %s', (i) => {
      const firstFilePath = findFixture(`before-recursive${i}`);
      const secondFilePath = findFixture(`after-recursive${i}`);
      const expected = fs.readFileSync(findFixture('expected-recursive'), 'utf-8');
      expect(gendiff(firstFilePath, secondFilePath)).toBe(expected);
    },
  );

  test.each([
    ['.json', '.yml'],
    ['.yml', '.json'],
    ['.json', '.ini'],
    ['.ini', '.json'],
    ['.yml', '.ini'],
    ['.ini', '.yml'],
  ])(
    'with extensions of %s and %s',
    (ex1, ex2) => {
      const firstFilePath = findFixture(`before${ex1}`);
      const secondFilePath = findFixture(`after${ex2}`);
      const expected = fs.readFileSync(findFixture('expected'), 'utf-8');
      expect(gendiff(firstFilePath, secondFilePath)).toBe(expected);
    },
  );

  test.each([
    ['.json', '.yml'],
    ['.yml', '.json'],
    ['.json', '.ini'],
    ['.ini', '.json'],
    ['.yml', '.ini'],
    ['.ini', '.yml'],
  ])(
    'with extensions of %s and %s',
    (ex1, ex2) => {
      const firstFilePath = findFixture(`before-recursive${ex1}`);
      const secondFilePath = findFixture(`after-recursive${ex2}`);
      const expected = fs.readFileSync(findFixture('expected-recursive'), 'utf-8');
      expect(gendiff(firstFilePath, secondFilePath)).toBe(expected);
    },
  );
});
