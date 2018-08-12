import express from 'express';

export default () => {
  const app = express();
  app.get('/', (req, res) => {
    res.json({ hoge: 'root' });
  });
  app.get('/hoge', (req, res) => {
    res.json({ hoge: 'hoge' });
  });
  return app;
};
