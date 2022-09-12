import { FC } from 'react';
import './GlyphButton.scss';
import { glyphsIcons } from '../../../assets/svgs';
import ButtonWithIcon from '../ButtonWithIcon';

type Props = {
  labels: string[];
  iconId: string;
};

export const GlyphButton: FC<Props> = ( { labels, iconId } ) => {
  return (
    <div className='glyph_button__container'>
      <div className='glyph_button__icon'>
        <svg>
          <use href={ glyphsIcons + '#' + iconId } />
        </svg>
      </div>

      <div className='glyph_button__content'>
        <span>{ labels[0] }</span>
        <ButtonWithIcon
          overrideClass='glyph_button__button-with-icon'
          iconId='forward'
          size='small'
          label={ labels[1] }
        />
      </div>
    </div>
  );
};

export default GlyphButton;
