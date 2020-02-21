import React from 'react';
import mapboxgl from 'mapbox-gl';
import { ServicesContext } from '../services';

let createMarker = (img: any, w: number, h: number) => {
  let el = document.createElement('div');
  el.className = 'marker';
  el.style.backgroundImage = `url(/map/${img})`;
  el.style.width = w + 'px';
  el.style.height = h + 'px';
  el.style.backgroundRepeat = 'no-repeat';
  return new mapboxgl.Marker(el);
};

class Map extends React.Component<any, any> {

  mapContainer: any;
  planeMarker: mapboxgl.Marker;

  constructor(props: any) {
    super(props);
    this.state = {
      lng: -95.3143,
      lat: 29.9848,
      zoom: 2,
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.planeMarker = createMarker('plane.png', 50, 50).setLngLat([0, 0]);
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    map.on('load', () => {
      this.planeMarker.addTo(map);
    });
    window.addEventListener('resize', () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    });
  }

  render() {
    let { width, height } = this.state;
    return (
      <div className="map-wrapper">
        <ServicesContext.Consumer>
          {({telemetry}: any) => {
            if(telemetry) {
              // @ts-ignore
              this.planeMarker?.setLngLat([telemetry.pos.lon, telemetry.pos.lat]).setRotation(telemetry.rot.yaw);
            }
            return <h2>{JSON.stringify({telemetry})}}</h2>
          }}
        </ServicesContext.Consumer>
        <div id="#map" ref={elem => this.mapContainer = elem}
          style={{ height: height + 'px', width: width + 'px' }} />
      </div>
    )
  }
}

export default Map;
