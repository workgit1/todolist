import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTask, AddTaskContent, setCoordinates } from '../actions/taskActions.js'
import { Card, CardContent, TextField, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import './AddTask.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import {coordinateSelector, filterByContentSelector} from "../selectors/selectors"

function AddTodo() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [showForm, setShowForm] = useState(false)
  const coordinate = useSelector(coordinateSelector)
  const content = useSelector(filterByContentSelector)
  const dispatch = useDispatch()
  
  const handleChange = e => {
    dispatch(AddTaskContent(e.target.value))
  }

  const handleSubmit = e => {
    e.preventDefault() 
    if (content !== "") {
      dispatch(AddTask(content, startDate, endDate, coordinate)) 
      setStartDate(new Date())
      setEndDate(new Date())
      dispatch(AddTaskContent(''))
      setShowForm(false)
    }
  }

  const showAddForm = () => {
    setStartDate(new Date())
    setEndDate(new Date())
    dispatch(setCoordinates([0,0]))
    setShowForm(true)
  }

  const form = () => {
    if (showForm) {
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
        )
    } else if (!showForm){
      return (
        <Fab id='addButton' color="primary" aria-label="add" onClick={showAddForm}>
          <AddIcon />
        </Fab>
      )
    }
  }
  return (
    form()
  )
}
  
export default AddTodo