import AUO from '../src';
const auo = new AUO();
describe('test', () => {
  it('test', () => {
    const result = auo.fetch('https://appear.in/');
    console.log(result);
  });
});
