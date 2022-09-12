import { FC } from 'react';
import './ToggleButton.scss';

type Props = {
  labels: string[];
};

export const ToggleButton: FC<Props> = ( { labels } ) => {
  const htmlTemplate = labels.map( ( label, index ) => {
    return (
      <div key={ label }>
        <input
          defaultChecked={ index === 0 }
          type='radio'
          className='toggle-button__button'
          name='radioButton'
          value={ labels[index] }
          id={ `button-${ index }` }
        />
        <label htmlFor={ `button-${ index }` }>{ labels[index] }</label>
      </div>
    );
  } );

  return <div className='toggle-button__container'>{ htmlTemplate }</div>;
};

export default ToggleButton;
