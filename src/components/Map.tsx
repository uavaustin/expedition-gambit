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
  dropMarker: mapboxgl.Marker;
  planeMarker: mapboxgl.Marker;
  updateFlyzonePoly: Function;
  updateWaypointLine: Function;
  map: mapboxgl.Map | null = null;

  constructor(props: any) {
    super(props);
    this.state = {
      lng: -76.4223,
      lat: 38.1467,
      zoom: 15,
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
  }

  componentDidMount() {
    var style = {
      version: 8,
      sources: {
        countries: {
          type: 'raster',
          // "url": "mapbox://map-id"
          // "url": "http://tileserver.com/layer.json",
          tiles: [
            'http://127.0.0.1:8080/tiles/{z}/{x}/{y}@2x.png'
          ],
          maxzoom: 15
        }
      },
      layers: [
        {
          id: 'background',
          type: 'background',
          paint: {
            'background-color': '#ddeeff'
          }
        },
        {
          id: 'area-white',
          type: 'raster',
          source: 'countries',
          'source-layer': 'country',
        }
      ]
    };
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      // @ts-ignore
      style: JSON.parse(JSON.stringify(style)) // idk why this works
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
          {({ telemetry, mission }) => {
            if (telemetry) {
              // @ts-ignore
              this.planeMarker?.setLngLat([telemetry.pos.lon, telemetry.pos.lat]).setRotation(telemetry.rot.yaw);
            }
            if (mission) {
              console.log(mission);
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
