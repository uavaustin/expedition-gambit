import { ServerState } from '../flight/services';

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