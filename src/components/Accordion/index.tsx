import { FC } from 'react';
import './Accordion.scss';
import useService from './Accordion.service';
import cn from 'classnames';

type Props = {
  button?: any;
  content?: any;
  overrideClass?: string;
};

export const Accordion: FC<Props> = ( { button, content, overrideClass } ) => {
  const { isOpen, accordionClickHandler } = useService();

  return (
    <div
      data-testid='accordion'
      className={ cn( overrideClass, `accordion ${ isOpen ? 'accordion--is-open' : 'accordion--is-close' }` ) }
    >
      <div className='accordion__title' onClick={ accordionClickHandler }>
        { button }
      </div>
      <div className='accordion__item'>
        <div className='accordion__content'>{ content }</div>
      </div>
    </div>
  );
};

export default Accordion;
