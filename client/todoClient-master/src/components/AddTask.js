import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddTask, AddTaskContent } from '../actions/taskActions.js'
import { Card, CardContent, TextField } from '@material-ui/core';
import './AddTask.css'

function AddTodo() {
  const content = useSelector(state => state.filter)
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    dispatch(AddTaskContent(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (content !== "") {
      dispatch(AddTask(content)) 
    }
  }
  
  return (
    <Card className="add-task">
      <CardContent className="new-task-content">
        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="Add a new task:"
            onChange={handleChange} 
            value={content}
          />
        </form>
      </CardContent>
    </Card>
  )
}
  
export default AddTodo;