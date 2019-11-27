import mapboxgl from 'mapbox-gl';
import React from 'react';

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmVoYW4iLCJhIjoiY2szM2V1dW9qMDNrcjNucW91YmFwYXJpYyJ9.6PYwtsPQaK1vub6aDUZMvg';

class Map extends React.Component {
    state = {
        lng: 5,
        lat: 34,
        zoom: 2
    };

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
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        )
    }
}

export default Map;