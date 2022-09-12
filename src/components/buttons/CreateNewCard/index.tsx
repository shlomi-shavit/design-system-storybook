import { FC } from 'react';
import './CreateNewCard.scss';
import ActionIcon from '../ActionIcon';

type Props = {
  label: string;
};

export const CreateNewCard: FC<Props> = ( { label } ) => {
  return (
    <label className='new-card__container' htmlFor={ label }>
      <button
        id={ label }
        className='new-card__button'
        onClick={ () => {
          console.log( 'button clicked' );
        } }
      >
        <div className='new-card__button__icon'>
          <ActionIcon iconId='circled-add' />
        </div>
      </button>
      <span className='new-card__button__text'>{ label }</span>
    </label>
  );
};

export default CreateNewCard;
