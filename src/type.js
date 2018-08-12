// @flow

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type Snapshot = {
  req: {
    path: string,
    method: HttpMethod,
    body?: Object,
    params?: Object
  },
  res: { body: Object, status: number }
};
export type AUOparams = { snapshots?: Snapshot[] };
