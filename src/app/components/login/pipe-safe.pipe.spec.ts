import { PipeSafePipe } from './pipe-safe.pipe';

describe('PipeSafePipe', () => {
  it('create an instance', () => {
    const pipe = new PipeSafePipe();
    expect(pipe).toBeTruthy();
  });
});
