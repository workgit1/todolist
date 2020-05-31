import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTask, AddTaskContent } from '../actions/taskActions.js'
import { Card, CardContent, TextField } from '@material-ui/core';
import './AddTask.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

function AddTodo() {
  const content = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    dispatch(AddTaskContent(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (content !== "") {
      dispatch(AddTask(content, startDate, endDate)) 
      setStartDate(new Date())
      setEndDate(new Date())
    }
  }
  
  // Date
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <Card className="add-task">
      <CardContent className="new-task-content">
        <form onSubmit={handleSubmit}>
          <TextField
            className="text-filed"
            style={{ margin: 8 }}
            placeholder="Add a new task:"
            onChange={handleChange} 
            value={content}
          />     
        </form>
        <div className = 'dateLine'>
            <div className = 'dateRow'>
              start date: <DatePicker
                withPortal
                selected={startDate}
                onChange={date => setStartDate(date)}
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
                selected={endDate}
                onChange={date => setEndDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
              /> 
            </div>
          </div>  
      </CardContent>
    </Card>
  )
}
  
export default AddTodo;