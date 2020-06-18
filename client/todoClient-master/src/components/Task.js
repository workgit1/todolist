import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, editTask } from '../actions/taskActions.js'
import './Tasks.css'
import { Card, CardContent, Checkbox } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

function Task(props) {
    const task = props.task 
    const dispatch = useDispatch()
    
    const confirmTask = (id, content, IsConfirm) => dispatch(editTask(id, content, !IsConfirm))
    
    const changeTask = (id, IsConfirm, content) => {
        let editedTask = prompt("edit the task", content)
        if (editedTask !== null && editedTask !== content) {
            dispatch(editTask(id, editedTask, IsConfirm))
        }    
    }

    const removeTask = id => dispatch(deleteTask(id))
    
    return (
        <Card key={task._id} className="task">    
            <CardContent> 
                <Checkbox
                    color="primary"
                    checked={task.IsConfirm}
                    onChange={() => confirmTask(task._id, task.content, task.IsConfirm)}
                />   
                <label>{task.content}</label>
                <IconButton className="action-icon"  onClick={() => removeTask(task._id)}>
                <DeleteIcon/>
                </IconButton>
                <IconButton className="action-icon" onClick={() => changeTask(task._id, task.IsConfirm, task.content)}>
                <EditIcon/>
                </IconButton>
            </CardContent>
        </Card>
    )
}
  
export default Task
