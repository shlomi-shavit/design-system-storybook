import { Children, cloneElement, FC, ReactElement, useEffect, useRef, useState } from 'react';

const useService = () => {
  type MapElementProps = {
    center?: any;
    zoom?: any;
    children?: any;
  };

  const MapElement: FC<MapElementProps> = ( { center, zoom, children } ) => {
    const ref: any = useRef<HTMLDivElement>();
    const [ map, setMap ] = useState<google.maps.Map | null>( null );

    useEffect( () => {
      setMap(
        new window.google.maps.Map( ref.current, {
          mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: [ 'roadmap', 'satellite' ],
          },
          streetViewControl: false,
          fullscreenControl: false,
        } ),
      );
    }, [] );

    if ( map ) {
      map.setCenter( center );
      map.setZoom( zoom );
    }

    return (
      <div className='map' ref={ ref } id='map'>
        { Children.map( children, ( child: ReactElement ) => cloneElement( child, { map } ) ) }
      </div>
    );
  };

  type MarkerProps = {
    position?: any;
    map?: any;
  };

  const Marker: FC<MarkerProps> = ( { position, map } ) => {
    const [ marker, setMarker ] = useState<google.maps.Marker | null>( null );
    useEffect( () => {
      setMarker(
        new window.google.maps.Marker( {
          animation: google.maps.Animation.DROP,
        } ),
      );
    }, [] );

    if ( marker ) {
      marker.setMap( map );
      marker.setPosition( position );
    }

    return null;
  };

  return {
    MapElement,
    Marker,
  };
};

export default useService;
