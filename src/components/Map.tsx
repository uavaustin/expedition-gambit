import React from 'react';
import mapboxgl from 'mapbox-gl';

class Map extends React.Component<any, any> {
  
  mapContainer: any;

  constructor(props: any) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
      width: window.innerWidth, 
      height: window.innerHeight
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });
    window.addEventListener('resize', () => {
      this.setState({ width: window.innerWidth, height: window.innerHeight});
    });
  }

  render() {
    let {width, height} = this.state;
    return (
      <div className="map-wrapper">
        <div id="#map" ref={elem => this.mapContainer = elem}
          style={{height: height + 'px', width: width + 'px'}}/>
      </div>
    )
  }
}

export default Map;
