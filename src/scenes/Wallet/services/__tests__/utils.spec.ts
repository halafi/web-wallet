import { trimString } from '../utils';

describe('#utils', () => {
  test('trimString', () => {
    expect(trimString('qwertyqwerty')).toEqual('qwertyqwerty');
    expect(trimString('foo')).toEqual('foo');
    expect(trimString('')).toEqual('');
    expect(trimString('123456789ABC')).toEqual('123456789ABC');
    expect(trimString('123456789ABCD')).toEqual('123456789ABCD');
    expect(trimString('123456789ABCDE')).toEqual('12345...ABCDE'); // trim 14 chars to 13
    expect(trimString('AeaqhUKfBtVqNhtMct3piBiWfdhbRwbg4W')).toEqual('Aeaqh...wbg4W');
  });
});

// TODO: test all util functions
