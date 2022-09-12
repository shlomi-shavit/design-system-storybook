import React, { FC } from 'react';
import './ActionIcon.scss';
import { systemIcons } from '../../../assets/svgs/';
import cn from 'classnames';

type Props = {
  iconId?: string;
  clickable?: boolean;
  overrideClass?: string;
};

export const ActionIcon: FC<Props> = ( { iconId, clickable, overrideClass } ) => {
  return (
    <div className={ cn( 'icon', clickable && 'icon--clickable', overrideClass ) }>
      <svg>
        <use href={ systemIcons + '#' + iconId } />
      </svg>
    </div>
  );
};

export default React.memo( ActionIcon );
