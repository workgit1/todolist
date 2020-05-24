import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAll, hideDone, deleteDoneTask } from '../actions/taskActions.js'
import './Menu.css'
import FilterListIcon from '@material-ui/icons/FilterList';
import { IconButton } from '@material-ui/core';

function Menu() {    
    const tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()
    let doneTasksHide = false

    const deleteAllDoneTasks = () => {
        let id = []
        tasks.map(task => {
            if (task.confirm) {
                id.push(task._id)
            }
        })
        dispatch(deleteDoneTask(id))
    }

    const hideDoneTasks = () => {
        if (doneTasksHide) {
            dispatch(showAll())
        } else {
            dispatch(hideDone())
        }
        doneTasksHide = !doneTasksHide
    }

    return (
        <div className="menu">
            <IconButton className="menu-icons" onClick={deleteAllDoneTasks}>
            <img src="https://cdn2.iconfinder.com/data/icons/cleaning-19/30/30x30-10-512.png" 
            alt="" className="icon-size"></img></IconButton>
            <IconButton color={doneTasksHide ? 'primary' : 'default' } 
            className="menu-icons" onClick={hideDoneTasks}>
            <FilterListIcon/></IconButton>
        </div>
    )
}
  
export default Menu;
