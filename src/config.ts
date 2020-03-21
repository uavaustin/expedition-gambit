const LS_KEY = 'eg:config';

const CONFIG = (localStorage.getItem(LS_KEY) != null) ?
  JSON.parse(localStorage.getItem(LS_KEY) as string) : null;

const DEFAULT_CONFIG = {
  services: {
    telemetry: {
      url: 'http://67.205.146.248:5000',
      rate: 10000
    },
    pong: {
      url: 'http://67.205.146.248:7000'
    },
    interopProxy: {
      url: 'http://67.205.146.248:8000'
    }
  },
  map: {
    lng: -76.434088,
    lat: 38.142544,
    zoom: 13,
    token: 'pk.eyJ1Ijoic3NoaDEyIiwiYSI6ImNpcTVhNDQxYjAwM3FmaGtrYnl6czEwMGcifQ.eYETiDD8NqThLahLIBmjSQ'
  }
};

if (CONFIG == null) {
  localStorage.setItem(LS_KEY, JSON.stringify(DEFAULT_CONFIG));
  window.location.reload();
}

export let updateConfig = (config: any) => {
  localStorage.setItem(LS_KEY, JSON.stringify(config));
  window.location.reload();
};

export default CONFIG;