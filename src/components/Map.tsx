import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './map.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmVoYW4iLCJhIjoiY2szM2V1dW9qMDNrcjNucW91YmFwYXJpYyJ9.6PYwtsPQaK1vub6aDUZMvg';

interface MapState {
    lng: number,
    lat: number,
    zoom: number
}

interface MapProps {

}

class Map extends React.Component<MapProps, MapState> {
    mapContainer: any = null;

    constructor(props: MapProps) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
    }

    render() {
        return (
            <div className="map" style={{ backgroundColor: '#aaaaaa', width: '100%', height: window.innerHeight + 'px' }}>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}

export default Map;
