import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import config from '@/config/index';
const { mapboxToken } = config;

const mapList = ({ initialLocation, shops }) => {
  return (
    <div>
      {initialLocation && (
        <ReactMapGL
          mapboxAccessToken={mapboxToken}
          style={{
            width: '100%',
            height: '250px'
          }}
          initialViewState={{
            zoom: 15,
            latitude: initialLocation.latitude,
            longitude: initialLocation.longitude
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
            latitude={initialLocation.latitude}
            longitude={initialLocation.longitude}
            color="#F60909"
          />
          {shops.map((shop) => (
            <div key={shop.id}>
              <Marker latitude={shop.latitude} longitude={shop.longitude} />
            </div>
          ))}
          <NavigationControl />
        </ReactMapGL>
      )}
    </div>
  );
};

export default mapList;
