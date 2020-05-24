import React from 'react'
import { useSelector } from 'react-redux'
import Tasks from './Tasks.js'
import AddTask from './AddTask.js'
import Menu from './Menu.js'
import './ToDoList.css'

function ToDoList() { 
    const tasks = useSelector(state => state.tasks)
    let tasksNumber = tasks.length
    let doneTasksNumber = tasks.filter(task => task.confirm).length

    return(
        <div className = 'tasks'>
            <h1 className = 'title'>Todo list</h1>
            <div className="tasks-info">
                <div className="createdTask">{tasksNumber}</div>
                <div className="complitedTask">{doneTasksNumber}</div>
            </div>
            <div className="tasks-about">
                <div className="createdTask">tasks created</div>
                <div className="complitedTask">tasks complited</div>
            </div>
            <Tasks/>
            <AddTask/>
            <Menu/>
        </div>
    )
}

export default ToDoList;