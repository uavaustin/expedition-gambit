import { ServerState } from '../flight/services';

export type LogLevel = 'info' | 'warn' | 'error';
export type LogItem = {level: LogLevel, cnt: number, text: string}

class Watcher {

  log: Function = console.log;

  constructor() { }

  setLogFunc(func: Function) {
    this.log = func;
  }

  feedData({ telemetry, mission, odlcs }: ServerState) {
    // check for issues and log here
    if(!telemetry) {
      this.log('warn', 'Failed to fetch telemetry.');
    }
  }

}

export default Watcher;