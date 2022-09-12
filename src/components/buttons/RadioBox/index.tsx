import { FC } from 'react';
import './RadioBox.scss';
import cn from 'classnames';

type Props = {
  labels: string[];
  size: string;
};

export const RadioBox: FC<Props> = ( { labels, size } ) => {
  const htmlTemplate = labels.map( ( label, index ) => {
    return (
      <div key={ label }>
        <input
          type='radio'
          className='radio-box__button'
          name={ 'radio-box' }
          value={ labels[index] }
          id={ `radio-box-${ labels[index] }` }
        />
        <label htmlFor={ `radio-box-${ labels[index] }` }>{ labels[index] }</label>
      </div>
    );
  } );

  return (
    <div className={ cn( 'radio-box__container', `radio-box__button--${ size }` ) }>
      { htmlTemplate }
    </div>
  );
};

export default RadioBox;
