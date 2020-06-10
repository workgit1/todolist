import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, editTask, getTasks } from '../actions/taskActions.js'
import './Tasks.css'
import { Card, CardContent, Checkbox } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'


function Tasks() { 
    let AllTasks = useSelector(state => state.tasks)
    const filter = useSelector(state => state.filter)
    const hide = useSelector(state => state.hide)
    const dispatch = useDispatch()

    const confirmTask = (task) => {
        dispatch(editTask(task._id, task.content, !task.IsConfirm))
    }
    
    const changeTask = (task) => {
        let editedTask = prompt("edit the task", task.content)
        if (editedTask !== null && editedTask !== task.content) {
            dispatch(editTask(task._id, editedTask, task.IsConfirm))
        }    
    }

    const removeTask = (task) => {
        dispatch(deleteTask(task._id))
    }
     
    useEffect(() => {
        dispatch(getTasks()) 
    }, [dispatch])
    
    const tasks = AllTasks.map(task => {
        if (((!task.IsConfirm) || (!hide)) && (task.content.includes(filter))) {
            return (
                <Card key={task._id} className="task">    
                    <CardContent> 
                        <Checkbox
                            color="primary"
                            checked={task.IsConfirm}
                            onChange={() => {confirmTask(task)}}
                        />   
                        <label>{task.content}</label>
                        <IconButton className="action-icon"  onClick={() => {removeTask(task)}}>
                        <DeleteIcon/>
                        </IconButton>
                        <IconButton className="action-icon" onClick={() => {changeTask(task)}}>
                        <EditIcon/>
                        </IconButton>
                    </CardContent>
                </Card>
            )
        }
        return null
    })
    
    return (
        <div className="tasks-collection">
            {tasks}
        </div>
    )

}
  
export default Tasks
