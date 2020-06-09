import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTask, AddTaskContent, setCoordinates } from '../actions/taskActions.js'
import { Card, CardContent, TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import './AddTask.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

function AddTodo() {
  const coordinate = useSelector(state => state.coordinate)
  const content = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    dispatch(AddTaskContent(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (content !== "") {
      dispatch(AddTask(content, startDate, endDate, coordinate)) 
      setStartDate(new Date())
      setEndDate(new Date())
      dispatch(AddTaskContent(''))
      document.getElementById("a").style.display = "none" 
    }
  }

  const showAddForm = () => {
    setStartDate(new Date())
    setEndDate(new Date())
    dispatch(setCoordinates([0,0]))
    document.getElementById("a").style.display = "block" 
  }

  // Date
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  return (
    <div>
      <Fab id='addButton' color="primary" aria-label="add" onClick={showAddForm}>
        <AddIcon />
      </Fab>
      <Card className="add-task" id='a'>
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
          <div className = 'Line'>
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
          <div className = 'Line'>
            <div className = 'XRow'>
              X: {parseFloat(coordinate[0]).toFixed(4)}     
            </div>
            <div className = 'YRow'>
              Y: {parseFloat(coordinate[1]).toFixed(4)}
            </div>
          </div> 
        </CardContent>
      </Card>
    </div>
  )
}
  
export default AddTodo;