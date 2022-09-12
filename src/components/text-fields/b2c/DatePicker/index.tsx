import React, { FC } from 'react';
import formService from '../../../../general-services/form.service';
import DatePicker, { registerLocale } from 'react-datepicker';
import he from 'date-fns/locale/he';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.scss';
import ActionIcon from '../../../../components/buttons/ActionIcon';
import cn from 'classnames';
import { t } from 'i18next';

registerLocale( 'he', he );

type Props = {
  label: string;
  placeholder: string;
  show_year_dropdown: boolean;
  year_dropdown_years_number: number;
  clear_button: boolean;
  date_format: string;
  required: boolean;
};

export const Datepicker: FC<Props> = ( {
  label,
  placeholder,
  show_year_dropdown,
  year_dropdown_years_number,
  clear_button,
  date_format,
  required,
} ) => {
  const { value, errors, handleChange } = formService();

  return (
    <div
      className={ cn( 'react-datepicker__container', show_year_dropdown && 'react-datepicker--with-year-dropdown' ) }>
      { label && (
        <label htmlFor='date-picker'>
          { label }
          { required && <span>●</span> }
        </label>
      ) }

      <div className='react-datepicker__input'>
        <DatePicker
          locale='he'
          placeholderText={ placeholder }
          selected={ Object.values( value )[0] }
          onChange={ ( date: any, e ) => handleChange( e, 'date', date ) }
          todayButton={ t( 'datePicker.today' ) }
          showYearDropdown={ show_year_dropdown }
          yearDropdownItemNumber={ year_dropdown_years_number }
          isClearable={ clear_button }
          clearButtonTitle={ t( 'datePicker.clear' ) }
          minDate={ new Date() } // display current date
          dateFormat={ date_format } // MM.dd | MM.dd.yy
          dateFormatCalendar='LLLL' // dd LLLL yyyy
          scrollableYearDropdown={ true }
          // showMonthDropdown={true}
          id='date-picker'
          autoComplete={ 'off' }
        />

        <div className='react-datepicker__icon'>
          <ActionIcon iconId='date-start' />
        </div>
      </div>

      <div className='react-datepicker__notifications'>
        { required && errors['date'] && <div className='react-datepicker__error-message'>{ errors['date'] }</div> }
      </div>
    </div>
  );
};

Datepicker.defaultProps = {
  label: t( 'datePicker.date' ),
  placeholder: t( 'datePicker.date' ),
  show_year_dropdown: true,
  year_dropdown_years_number: 5,
  clear_button: true,
  date_format: 'MM.dd',
  required: true,
};
