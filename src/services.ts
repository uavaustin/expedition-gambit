import React from 'react';
import { Overview, CameraTelem, MissionCurrent } from './messages/telemetry_pb';
import { PingTimes } from './messages/stats_pb';
import { InteropMission, Obstacles, OdlcList } from './messages/interop_pb';

const TELEMETRY_SERVER = 'http://67.205.146.248:5000';
const PONG_SERVER = 'http://67.205.146.248:7000';
const INTEROP_PROXY_SERVER = 'http://67.205.146.248:8000';

let doGetRequest = async (server: string, path: string, deserializer: any) => {
  let url = server + '/api/' + path;
  let resp = await fetch(url, {});
  let encoded = new Uint8Array(await resp.arrayBuffer());
  let decoded = deserializer.deserializeBinary(encoded);
  return decoded.toObject();
};

export let Telemetry = {
  overview: () => doGetRequest(TELEMETRY_SERVER,
    'overview', Overview) as Promise<Overview.AsObject>,
  cameraTelem: () => doGetRequest(TELEMETRY_SERVER,
    'camera-telem', CameraTelem) as Promise<CameraTelem.AsObject>,
  missionCurrent: () => doGetRequest(TELEMETRY_SERVER,
    'mission-current', MissionCurrent) as Promise<MissionCurrent.AsObject>
};

export let Pong = {
  ping: () => doGetRequest(PONG_SERVER,
    'ping', PingTimes) as Promise<PingTimes.AsObject>,
};

export let InteropProxy = {
  mission: () => doGetRequest(INTEROP_PROXY_SERVER,
    'mission', InteropMission) as Promise<InteropMission.AsObject>,
  obstacles: () => doGetRequest(INTEROP_PROXY_SERVER,
    'obstacles', Obstacles) as Promise<Obstacles.AsObject>,
  odlcs: () => doGetRequest(INTEROP_PROXY_SERVER,
    'odlcs', OdlcList) as Promise<OdlcList.AsObject>,
};

type ServerState = {
  telemetry: Overview.AsObject,
  mission: InteropMission.AsObject,
  odlcs: OdlcList.AsObject
};

export const ServicesContext = React.createContext({} as ServerState);