import React, { FC } from 'react';
import './Center.scss';

type Props = {
  children: any;
  style?: any;
};

export const Center: FC<Props> = ( props: any ) => {
  return (
    <div style={ props.style } className='center'>
      { props.children }
    </div>
  );
};

export default Center;
