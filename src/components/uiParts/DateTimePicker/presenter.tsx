import React, { forwardRef, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from '../../icons/Calendar';

interface DateTimePickerProps {
  id: string;
  label: string;
  placeholder: string;
  description: string;
  theme: string;
  setValue: (value: Date) => void;
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
  const datePickerRef = useRef<DatePicker | null>(null)

  const handleDateChange = async (date: Date | null) =>  {
    setSelectedDate(date)
    if(date)props.setValue(date)
  }

  useEffect(() => {
    if(selectedDate)props.setValue(selectedDate)
  }, [selectedDate])

  const handleCalendar = () => {
    if(datePickerRef.current?.isCalendarOpen){
      datePickerRef.current?.setOpen(true)
    } else {
      datePickerRef.current?.setOpen(false)
    }
  }

  return (
    <div className="mb-6">
      <label htmlFor={props.id} className={`block mb-2 text-sm font-medium text-gray-700`}>
        {props.label}
      </label>
      <div className={'flex flex-row gap-1'}>
        <DatePicker
          id={props.id}
          ref={datePickerRef}
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
          customInput={<p className="block w-full p-2.5 border rounded bg-white">{selectedDate ? selectedDate.toLocaleString() : props.placeholder}</p>}
        />
        <div onClick={handleCalendar}>
          <Calendar theme="primary" />
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{props.description}</p>
    </div>
  )
}