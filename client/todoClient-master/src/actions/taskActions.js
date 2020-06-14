import axios from 'axios'
const URL = 'http://localhost:3001'

export const deleteTask = id => {
    const action = {
        type: 'DELETE_TASK',
        id
    }
    return async dispatch => {
        try {
            const res = await axios.delete(URL + `/deleteTask/${id}`)
            res.data ? dispatch(action) : alert('Failed delete the task, please try agian')
        } catch (err) {
            console.log(err.massage)
        }
    }
}

export const deleteDoneTask = id => {
    const action = {
        type: 'DELETE_DONE_TASKS',
        id
    }
    return async dispatch => {
        try {
            const res = await axios.post(URL + `/deleteDoneTasks`, id)
            res.data ? dispatch(action) : alert('Failed delete all done tasks, please try agian')
        } catch (err) {
            console.log(err.massage)
        }
    }
}

export const AddTask = (task, startDate, endDate, coordinate) => {
    const action = {
        type: 'ADD_TASK',
        task: {
            content: task,
            IsConfirm: false,
            start: startDate,
            end: endDate,
            coordinate
        }
    }
    return async dispatch => {
        try {
            const res = await axios.post(URL + '/addTask', action.task)
            if (res.data) {
                action.task._id = res.data
                dispatch(action)
            } else {
                alert('Failed change the task, please try agian')
            }
        } catch (err) {
            console.log(err.massage)
        }
    }
}

export const editTask = (id, task, IsConfirm) => {
    const action = {
        type: 'EDIT_TASK',
        task: {
            id: id,
            content: task,
            IsConfirm: IsConfirm
        }
    }
    return async dispatch => {
        try {
            const res = await axios.put(URL + '/editTask', action.task)
            res ? dispatch(action) : alert('Failed change the task, please try agian')
        } catch (err) {
            console.log(err.massage)
        }
    }
}

export const filterDoneTasks = () => {
    return {
        type: 'FILTER_DONE_TASKS',
    }
}

export const AddTaskContent = content => {
    return {
        type: 'FILTER',
        filterByContent: content
    }
}

export const getTasks = () => {
    return async dispatch => {
        try {
            const res = await axios.get(URL + '/task')
            dispatch(setTasks(res.data.tasks))
        } catch (err) {
            console.log(err.massage)
        }
    }
}

export const setTasks = tasks => {
    return {
        type: 'GET_TASKS',
        tasks: tasks
    }
}

export const setFocusItem = id => {
    return {
        type: 'SET_FOCUS_ITEM',
        id
    }
}

export const setCoordinates = coordinate => {
    return {
        type: 'SET_COORDINATES',
        coordinate
    }
}

export const setDate = (id, start, end) => {
    const action = {
        type: 'SET_DATE',
        task: { 
            id,
            start,
            end
        }
    }
    return async dispatch => {
        try {
            const res = await axios.put(URL + '/editDate', action.task)
            res ? dispatch(action) : alert('Failed change the task, please try agian')
        } catch (err) {
            console.log(err.massage)
        }
    }
}