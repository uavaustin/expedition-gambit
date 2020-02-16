import React from 'react';
import mapboxgl from 'mapbox-gl';

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

  constructor(props: any) {
    super(props);
    this.state = {
      lng: -95.3143,
      lat: 29.9848,
      zoom: 12.46,
      width: window.innerWidth,
      height: window.innerHeight
    };
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
      // sample code
      let planeMarker = createMarker('plane.png', 50, 50).setLngLat([0, 0]).addTo(map);
      let badPlaneMarker = createMarker('badplane.png', 50, 50).setLngLat([0, 0]).addTo(map);
      let i = 0;
      let animate = () => {
        // @ts-ignore
        planeMarker.setRotation(i++)
        planeMarker.setLngLat([-95.3143 + Math.sin(i / 60) * 0.01, 29.9848 + Math.cos(i / 60) * 0.01]);
        // @ts-ignore
        badPlaneMarker.setRotation(i++)
        badPlaneMarker.setLngLat([-95.318 + Math.sin(i / 60) * 0.03, 29.988 + Math.cos(i / 60) * 0.03]);
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      // sample code
    });
    window.addEventListener('resize', () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    });
  }

  render() {
    let { width, height } = this.state;
    return (
      <div className="map-wrapper">
        <div id="#map" ref={elem => this.mapContainer = elem}
          style={{ height: height + 'px', width: width + 'px' }} />
      </div>
    )
  }
}

export default Map;
