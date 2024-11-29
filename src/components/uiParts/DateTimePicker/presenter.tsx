import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

interface DateTimePickerProps {
  id: string;
  label: string;
  placeholder: string;
  description: string;
  theme: string;
  register: UseFormRegisterReturn;
  setValue: any;
  className?: string;
  selected?: Date | undefined;
  minDate?: Date;
  maxDate?: Date;
  excludeDates?: Date[];
  includeDates?: Date[];
  timeFormat?: string;
  timeIntervals?: number;
  dateFormat?: string;
}

export const DateTimePicker = (props: DateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(props.selected || null)

  const handleDateChange = async (date: Date | null) =>  {
    setSelectedDate(date)
    // const unixTime = date ? Math.floor(date.getTime() / 1000) : null // Unixタイムに変換
    // props.setValue(props.id, unixTime !== null ? unixTime.toString() : '')
    props.setValue(props.id, date)
  }

  useEffect(() => {
    // const unixTime = selectedDate ? Math.floor(selectedDate.getTime() / 1000) : null
    // props.setValue(props.id, unixTime !== null ? unixTime.toString() : '')
    props.setValue(props.id, selectedDate)
  }, [selectedDate])

  return (
    <div className="mb-6">
      <label htmlFor={props.id} className={`block mb-2 text-sm font-medium text-gray-700`}>
        {props.label}
      </label>
      <DatePicker
        // id={props.id}
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText={props.placeholder}
        className="block w-full p-2.5 border rounded"
        minDate={props.minDate}
        maxDate={props.maxDate}
        excludeDates={props.excludeDates}
        includeDates={props.includeDates}
        showTimeSelect
        timeFormat={props.timeFormat || "HH:mm"}
        timeIntervals={props.timeIntervals || 15}
        dateFormat={props.dateFormat || "yyyy/MM/dd HH:mm"}
      />
      <p className="mt-2 text-sm text-gray-500">{props.description}</p>
      <input type="hidden" id={props.id} {...props.register} />
    </div>
  )
}