import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAll, hideDone, deleteDoneTask } from '../actions/taskActions.js'
import { Button } from '@material-ui/core'
import './Menu.css'

function Menu() {    
    const tasks = useSelector(state => state.tasks)
    const dispatch = useDispatch()

    const deleteAllDoneTasks = () => {
        let id = []
        tasks.map(task => {
            if (task.confirm) {
                id.push(task._id)
            }
        })
        dispatch(deleteDoneTask(id))
    }

    const showAllTasks = () => {
        dispatch(showAll())
    }

    const hideDoneTasks = () => {
        dispatch(hideDone())
    }

    return (
        <div className="menu">
            <Button className="button" variant="outlined" color="primary" onClick={hideDoneTasks}>
            hide all done tasks</Button>
            <Button className="button" variant="outlined" color="primary" onClick={deleteAllDoneTasks}>
            delete all done tasks</Button>
            <Button className="button" variant="outlined" color="primary" onClick={showAllTasks}>
            show all</Button>
        </div>
    )
}
  
export default Menu;
