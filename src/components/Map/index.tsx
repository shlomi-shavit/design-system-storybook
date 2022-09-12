import { FC } from 'react';
import './Map.scss';
import useService from './Map.service';
import { Status, Wrapper } from '@googlemaps/react-wrapper';

type MapProps = {
  marker?: object;
  zoom?: number;
};

export const Map: FC<MapProps> = ( { marker, zoom = [] } ) => {
  const { MapElement, Marker } = useService();
  const render = ( status: Status ) => {
    return <h1>{ status }</h1>;
  };
  return (
    <Wrapper apiKey={ `${ process.env.GOOGLE_MAP_API_KEY }` } language='HE' render={ render }>
      <MapElement center={ marker } zoom={ zoom }>
        <Marker position={ marker } />
      </MapElement>
    </Wrapper>
  );
};

export default Map;
