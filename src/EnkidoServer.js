// @flow
import express, { type $Request, type $Response } from 'express';

import type { Snapshot } from './type';

export default class EnkidoServer {
  snapshots: Snapshot[];
  app: express$Application;
  constructor(snapshots: Snapshot[]) {
    this.snapshots = snapshots;
    this.app = createServer(this.snapshots);
  }

  listen(port: number) {
    return this.app.listen(port);
  }
}

const createServer = (snapshots: Snapshot[]): express$Application => {
  const app = express();
  const router = (req: $Request, res: $Response) => {
    const { path, method } = req;
    const responseSnapshot = snapshots.find(
      snapshot => snapshot.req.path === path && snapshot.req.method === method
    );
    if (!responseSnapshot) return res.status(404);
    return res
      .status(responseSnapshot.res.status)
      .json(responseSnapshot.res.body);
  };
  app.use('/', router);
  return app;
};
