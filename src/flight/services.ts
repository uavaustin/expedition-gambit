import React from 'react';
import { Overview, CameraTelem, MissionCurrent } from '../messages/telemetry_pb';
import { PingTimes } from '../messages/stats_pb';
import { InteropMission, Obstacles, OdlcList } from '../messages/interop_pb';
import { LogItem } from './watcher';
import CONFIG from '../config';


let doGetRequest = async (server: string, path: string, deserializer: any) => {
  let url = server + '/api/' + path;
  let resp = await fetch(url, {});
  let encoded = new Uint8Array(await resp.arrayBuffer());
  let decoded = deserializer.deserializeBinary(encoded);
  return decoded.toObject();
};

export let Telemetry = {
  overview: () => doGetRequest(CONFIG.services.telemetry.url,
    'overview', Overview) as Promise<Overview.AsObject>,
  cameraTelem: () => doGetRequest(CONFIG.services.telemetry.url,
    'camera-telem', CameraTelem) as Promise<CameraTelem.AsObject>,
  missionCurrent: () => doGetRequest(CONFIG.services.telemetry.url,
    'mission-current', MissionCurrent) as Promise<MissionCurrent.AsObject>
};

export let Pong = {
  ping: () => doGetRequest(CONFIG.services.pong.url,
    'ping', PingTimes) as Promise<PingTimes.AsObject>,
};

export let InteropProxy = {
  mission: () => doGetRequest(CONFIG.services.interopProxy.url,
    'mission', InteropMission) as Promise<InteropMission.AsObject>,
  obstacles: () => doGetRequest(CONFIG.services.interopProxy.url,
    'obstacles', Obstacles) as Promise<Obstacles.AsObject>,
  odlcs: () => doGetRequest(CONFIG.services.interopProxy.url,
    'odlcs', OdlcList) as Promise<OdlcList.AsObject>,
};

export type ServerState = {
  telemetry?: Overview.AsObject,
  mission?: InteropMission.AsObject,
  odlcs?: OdlcList.AsObject,
  logs?: LogItem[]
};

export const ServicesContext = React.createContext({} as ServerState);