import { FC } from 'react';
import './TextualIcon.scss';
import { textualIcons } from '../../../assets/svgs/';

type Props = {
  iconId?: string;
};

export const TextualIcon: FC<Props> = ( { iconId } ) => {
  return (
    <div className='textual-icon'>
      <svg>
        <use href={ textualIcons + '#' + iconId } />
      </svg>
    </div>
  );
};

export default TextualIcon;
