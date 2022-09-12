import React, { FC } from 'react';
import './Popover.scss';
import cn from 'classnames';

type Props = {
  popoverIsActive?: boolean;
  dimensions: any;
  positions: any;
  padding?: string;
  arrowDirection: string;
  arrowPositions: any;
  children: any;
};

export const Popover: FC<Props> = ( {
  popoverIsActive,
  dimensions,
  padding,
  positions,
  arrowDirection,
  arrowPositions,
  children,
} ) => {
  const popoverStyle = {
    width: dimensions.width,
    height: dimensions.height,
    left: positions.x,
    top: positions.y,
    padding: padding,
  };

  const popoverArrowStyle = {
    left: arrowPositions.x,
    top: arrowPositions.y,
  };

  return (
    <div className={ cn( 'popover__container', popoverIsActive && 'popover__container--is-active' ) }>
      <div style={ popoverStyle } className='popover'>

        { children }
        <div style={ popoverArrowStyle } className={ cn( 'popover__arrow', `popover__arrow--${ arrowDirection }` ) } />
      </div>
    </div>
  );
};

export default React.memo( Popover );
