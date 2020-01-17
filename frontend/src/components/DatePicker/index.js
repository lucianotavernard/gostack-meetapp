import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';
import { parseISO } from 'date-fns';

export default function DatePicker({ name }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const dateFormatted = useMemo(
    () => (defaultValue ? parseISO(defaultValue) : ''),
    [defaultValue]
  );

  const [selected, setSelected] = useState(dateFormatted);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        showTimeSelect
        timeIntervals={60}
        minDate={new Date()}
        dateFormat="yyyy-MM-dd HH:mm"
        placeholderText="Data do meetup"
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
};
