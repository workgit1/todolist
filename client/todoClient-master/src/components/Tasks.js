import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks } from '../actions/taskActions.js'
import './Tasks.css'
import {tasksSelector, filterByContentSelector, filterByStatusConfirmSelector} from "../selectors/selectors"
import Task from "./Task"


function Tasks() { 
    let AllTasks = useSelector(tasksSelector)
    const filterByContent = useSelector(filterByContentSelector)
    const filterByStatusConfirm = useSelector(filterByStatusConfirmSelector)
    const dispatch = useDispatch()

    useEffect(() => dispatch(getTasks()) , [dispatch])
    
    const filter = task => ((!task.IsConfirm) || (!filterByStatusConfirm)) && (task.content.includes(filterByContent))
    const tasks = AllTasks.map(task => {
        if (filter(task)) {
            return (
                <Task task={task}>
                </Task>
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
