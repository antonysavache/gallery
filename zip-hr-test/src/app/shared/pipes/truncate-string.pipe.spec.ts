import { TruncateStringPipe } from './truncate-string.pipe';

describe('TruncateStringPipe', () => {

const pipe = new TruncateStringPipe();

  it('create an instance', () => {
    const pipe = new TruncateStringPipe();
    expect(pipe).toBeTruthy();
  });

    it('test transform data string to strin...', () => {
    const pipe = new TruncateStringPipe();
    expect(pipe.transform('string', 5)).toBe('strin...');
  });
});
