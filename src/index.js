// @flow
import fetch from 'node-fetch';

export default class AUO {
  baseURL: string;
  snapshots: any;
  constructor() {}
  async fetch(params) {
    const fetchResult = await fetch();
    return fetchResult
  }
  generateMockServer() {}
  generateFlowType() {}
  generateSwagger() {}
}
