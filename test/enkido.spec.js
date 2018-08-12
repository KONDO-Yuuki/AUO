import fetch from 'node-fetch';

import EnkidoServer from '../src/EnkidoServer';
import AUOcollection from './AUOcollection.json';

let targetServer = null;
beforeAll(async () => {
  const app = new EnkidoServer(AUOcollection);
  targetServer = app.listen(8080);
});
describe('test', () => {
  it('root', async () => {
    const result = await fetch('http://localhost:8080/', { method: 'GET' });
    const json = await result.json();
    expect(json).toMatchSnapshot();
  });
  it('hoge', async () => {
    const result = await fetch('http://localhost:8080/hoge', { method: 'GET' });
    const json = await result.json();
    expect(json).toMatchSnapshot();
  });
});
afterAll(async () => {
  targetServer.close();
});
