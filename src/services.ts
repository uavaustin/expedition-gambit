import React from 'react';
import { Overview } from './messages/telemetry_pb';

const TELEMETRY_SERVER = 'http://67.205.146.248:5000';

let doRequest = async (server: string, path: string, deserializer: any) => {
  let url = server + '/api/' + path;
  let resp = await fetch(url, {});
  let encoded = new Uint8Array(await resp.arrayBuffer());
  let decoded = deserializer.deserializeBinary(encoded);
  return decoded.toObject();
};

export let Telemetry = {
  overview: () => doRequest(TELEMETRY_SERVER, 'overview', Overview) as Promise<Overview>
};

export const ServicesContext = React.createContext({});