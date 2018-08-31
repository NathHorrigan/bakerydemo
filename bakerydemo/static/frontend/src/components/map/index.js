
import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends React.Component {

    constructor(props) {
        super();
        const [latitude, longitude] = props.latLong.split(',');

        this.state = {
            viewport: {
                width: 1200,
                height: 400,
                latitude: parseInt(latitude),
                longitude: parseInt(longitude),
                zoom: 4
            }
        };
    }

    render() {
        const token = 'pk.eyJ1IjoiY2hyaXNsYXd0b24iLCJhIjoiY2psaTJpMW5oMGhrejNwczMwMmh4eXpvayJ9.Ma1WG0W-b9f2x8bayw1q2g';

        return (
            <ReactMapGL
                mapStyle='mapbox://styles/mapbox/light-v9'
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}
                mapboxApiAccessToken={token}
            />
        );
    }
}

export default Map;
