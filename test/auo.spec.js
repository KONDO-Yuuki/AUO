import fetch from 'node-fetch';
import express from 'express';

import AUO from '../src';

const createServer = async () => {
  const app = express();
  app.get('/', (req: $Request, res: $Response) => {
    res.json({ hoge: 'root' });
  });
  app.get('/hoge', (req: $Request, res: $Response) => {
    res.json({ hoge: 'hoge' });
  });
  return app;
};
const auo = new AUO({});
let targetServer = null;
beforeAll(async () => {
  const app = await createServer();
  targetServer = app.listen(8080);
});
describe('test', () => {
  it('root', async () => {
    const result = await fetch('http://localhost:8080/', { method: 'GET' });
    const json = await result.json();
    auo.collect({
      req: {
        path: '/',
        method: 'GET'
      },
      res: { body: json, status: result.status }
    });
  });
  it('hoge', async () => {
    const result = await fetch('http://localhost:8080/hoge', { method: 'GET' });
    const json = await result.json();
    auo.collect({
      req: {
        path: '/hoge',
        method: 'GET'
      },
      res: { body: json, status: result.status }
    });
  });
});
afterAll(() => {
  auo.generateCollectionJson();
  targetServer.close();
});
