import fetch from 'node-fetch';

import Auo from 'auo-core';
import testServer from './';
import EnkiduServer from 'auo-mock-server';
import auoCollection from './auo-collection.json';

describe('auo collect api data', () => {
  const auo = new Auo({});
  let targetServer = null;
  beforeAll(async () => {
    const app = await testServer();
    targetServer = app.listen(8080);
  });
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
  afterAll(() => {
    auo.generateCollectionJson(`${__dirname}/auo-collection.json`);
    targetServer.close();
  });
});

describe('test', () => {
  let targetServer = null;
  beforeAll(async () => {
    const app = new EnkiduServer(auoCollection);
    targetServer = app.listen(8080);
  });
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
  afterAll(async () => {
    targetServer.close();
  });
});
