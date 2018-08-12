// @flow

import fs from 'fs';

import type { AUOparams, Snapshot } from 'auo-interfaces';

export default class AUO {
  snapshots: Snapshot[];
  constructor(params: AUOparams) {
    this.snapshots = params.snapshots || [];
  }
  collect(snapshot: Snapshot): void {
    this.snapshots.push(snapshot);
  }

  generateCollectionJson(filePath: string = './auo-collection.json') {
    const data = JSON.stringify(this.snapshots);
    fs.writeFileSync(filePath, data);
  }

  generateMockServer() {}
  generateFlowType() {}
  generateSwagger() {}
}
