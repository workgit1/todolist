import React from 'react'
import './AddTask.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

function Date(props) {

  return (
    <div className = 'Line'>
      <div className = 'dateRow'>
        start date: <DatePicker
          withPortal
          selected={props.startDate}
          onChange={date => props.setStartDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <div className = 'dateRow'>
        end date: <DatePicker
          withPortal
          selected={props.endDate}
          onChange={date => props.setEndDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        /> 
      </div>
    </div>  
  )
}
  
export default Date