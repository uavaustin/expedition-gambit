import React from 'react';
import mapboxgl from 'mapbox-gl';
import { ServicesContext } from '../services';
import CONFIG from '../config';

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
  dropMarker: mapboxgl.Marker;
  planeMarker: mapboxgl.Marker;
  updateFlyzonePoly: Function;
  updateWaypointLine: Function;
  updateOdlcMarkers: Function;
  map: mapboxgl.Map | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      lng: CONFIG.map.lng,
      lat: CONFIG.map.lat,
      zoom: CONFIG.map.zoom,
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.planeMarker = createMarker('plane.png', 50, 50).setLngLat([0, 0]);
    this.dropMarker = createMarker('drop.png', 50, 50).setLngLat([0, 0]);
    this.updateFlyzonePoly = (coords: any[] = []) => {
      return {
        'type': 'Feature',
        'geometry': {
          'type': 'Polygon',
          'coordinates': coords
        }
      };
    };
    this.updateWaypointLine = (coords: any[] = []) => {
      return {
        'type': 'Feature',
        'properties': {},
        'geometry': {
          'type': 'LineString',
          'coordinates': coords
        }
      };
    };
    this.updateOdlcMarkers = (markers: any[]) => {
      return {
        'type': 'FeatureCollection',
        'features': markers.map((marker: any) => {
          return {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': marker.pos
            },
            'properties': {
              'title': marker.description,
              'icon': 'monument'
            }
          }
        })
      };
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    this.map = map;
    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    map.on('load', () => {
      this.planeMarker.addTo(map);
      this.dropMarker.addTo(map);
      map.addSource('flyzone', {
        'type': 'geojson',
        'data': this.updateFlyzonePoly([[]])
      });
      map.addLayer({
        'id': 'flyzone',
        'type': 'fill',
        'source': 'flyzone',
        'layout': {},
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.8
        }
      });
      map.addSource('waypoints', {
        'type': 'geojson',
        'data': this.updateWaypointLine([])
      });
      map.addLayer({
        'id': 'waypoints',
        'type': 'fill',
        'source': 'waypoints',
        'layout': {}
      });
      map.addSource('odlcs', {
        'type': 'geojson',
        'data': this.updateOdlcMarkers([])
      });
      map.addLayer({
        'id': 'odlcs',
        'type': 'symbol',
        'source': 'odlcs',
        'layout': {
          'icon-image': ['concat', ['get', 'icon'], '-15'],
          'text-field': ['get', 'title'],
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        }
      });
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
          {({ telemetry, mission, odlcs }) => {
            if (telemetry) {
              // @ts-ignore
              this.planeMarker?.setLngLat([telemetry.pos.lon, telemetry.pos.lat]).setRotation(telemetry.rot.yaw);
            }
            if (mission) {
              let flyzoneBoxes = [];
              let waypoints = mission.waypointsList.map(c => [c.lon, c.lat]);
              for (let flyzone of mission.flyZonesList) {
                let bounds = flyzone.boundaryList.map(c => [c.lon, c.lat]);
                flyzoneBoxes.push(bounds);
              }
              this.dropMarker?.setLngLat([mission.airDropPos?.lon || 0, mission.airDropPos?.lat || 0]);
              // @ts-ignore
              this.map?.getSource('flyzone')?.setData(this.updateFlyzonePoly(flyzoneBoxes));
              // @ts-ignore
              this.map?.getSource('waypoints')?.setData(this.updateWaypointLine(waypoints));
            }
            if (odlcs) {
              let odlcMarkers = odlcs.listList.map((odlc: any) => {
                return {
                  pos: [odlc.pos.lon, odlc.pos.lat]
                }
              })
              // @ts-ignore
              this.map?.getSource('odlcs')?.setData(this.updateOdlcMarkers(odlcMarkers));
            }
            return <div></div>;
          }}
        </ServicesContext.Consumer>
        <div id="#map" ref={elem => this.mapContainer = elem}
          style={{ height: height + 'px', width: width + 'px' }} />
      </div>
    )
  }
}

export default Map;
