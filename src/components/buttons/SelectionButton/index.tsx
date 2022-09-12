import React, { FC } from 'react';
import './SelectionButton.scss';
import useService from './SelectionButton.service';
import ActionIcon from '../ActionIcon';
import cn from 'classnames';

type Props = {
  label: string;
  buttonType: string;
  iconId?: undefined | string;
  acceptFiles?: string;
  overrideClass?: string;
  clickHandler?: any;
  content?: any;
};

export const SelectionButton: FC<Props> = ( {
  label,
  buttonType,
  iconId,
  acceptFiles,
  overrideClass,
  clickHandler,
  content,
} ) => {
  const { popoverIsActive, onClickHandler, buttonSvgId, selectedFileElement, addMediaInputElement, popoverElement } =
    useService( acceptFiles, buttonType, iconId, clickHandler, content );

  return (
    <div className='selection-button__wrapper'>
      <div
        className={ cn( 'selection-button', popoverIsActive && 'selection-button--popover-is-active', overrideClass ) }>
        <button
          type='button'
          className='selection-button__button'
          id={ buttonType === 'add-media' ? '' : `${ buttonType }-selection-button` }
          onClick={ onClickHandler }
        >
          <div className='selection-button__icon'>
            <ActionIcon iconId={ buttonSvgId[buttonType] } />
          </div>

          { addMediaInputElement }
        </button>

        <label className='selection-button__button-label' htmlFor={ `${ buttonType }-selection-button` }>
          { label }
        </label>

        { popoverElement }
      </div>
      { selectedFileElement }
    </div>
  );
};

export default SelectionButton;
