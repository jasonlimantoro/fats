import { orderByProperty } from 'lib/utils';

describe('orderByProperty', () => {
  let given;
  let copyGiven;
  beforeEach(() => {
    given = [{ name: 'Abigail', score: 90 }, { name: 'Charlie', score: 60 }, { name: 'Benjamin', score: 80 }];
    copyGiven = [...given];
  });
  it('should sort by string property in ascending manner', () => {
    const orderByName = orderByProperty('name');
    const expected = [copyGiven[0], copyGiven[2], copyGiven[1]];
    const actual = given.sort(orderByName);
    expect(actual).toEqual(expected);
  });
  it('should sort by string property in descending manner', () => {
    const orderByName = orderByProperty('name', 'descending');
    const expected = [copyGiven[1], copyGiven[2], copyGiven[0]];
    const actual = given.sort(orderByName);
    expect(actual).toEqual(expected);
  });

  it('should sort by integer property in ascending manner', () => {
    const orderByScore = orderByProperty('score');
    const expected = [copyGiven[1], copyGiven[2], copyGiven[0]];
    const actual = given.sort(orderByScore);
    expect(actual).toEqual(expected);
  });

  it('should sort by integer property in descending manner', () => {
    const orderByScore = orderByProperty('score', 'descending');
    const expected = [copyGiven[0], copyGiven[2], copyGiven[1]];
    const actual = given.sort(orderByScore);
    expect(actual).toEqual(expected);
  });
});
