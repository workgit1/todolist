import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterDoneTasks, deleteDoneTask } from '../actions/taskActions.js'
import './Menu.css'
import FilterListIcon from '@material-ui/icons/FilterList'
import DeleteIcon from '@material-ui/icons/Delete'
import { IconButton } from '@material-ui/core'
import {tasksSelector} from "../selectors/selectors"

function Menu() {    
    const tasks = useSelector(tasksSelector)
    const dispatch = useDispatch()

    const deleteAllDoneTasks = () => {
        const id = tasks.reduce((array, task)  => {
            console.log(array)
            if (task.IsConfirm) {
                array.push(task._id)
            } 
            return array
        }, [])
        dispatch(deleteDoneTask(id))
    }

    return (
        <div className="menu">
            <IconButton className="menu-icons" onClick={deleteAllDoneTasks}>
            <DeleteIcon/></IconButton>
            <IconButton className="menu-icons" onClick={ () => dispatch(filterDoneTasks())}>
            <FilterListIcon/></IconButton>
        </div>
    )
}
  
export default Menu
