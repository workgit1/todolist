import axios from 'axios'
const URL = 'http://localhost:3001'

export const deleteTask = (id) => {
    const action = {
        type: 'DELETE_TASK',
        id
    }
    return dispatch => {
        try {
            axios.delete(URL + `/deleteTask/${id}`)
                .then(res => {
                    if (res.data) {
                        dispatch(action)
                    } else {
                        alert('Failed delete the task, please try agian')
                    }
                })
        } catch (err) {
            console.log(err.massage)
        }
    }
}

export const deleteDoneTask = (id) => {
    const action = {
        type: 'DELETE_DONE_TASKS',
        id
    }
    return dispatch => {
        try {
            axios.post(URL + `/deleteDoneTasks`, id)
                .then(res => {
                    if (res.data) {
                        dispatch(action)
                    } else {
                        alert('Failed delete all done tasks, please try agian')
                    }
                })
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
    return dispatch => {
        try {
            return axios.post(URL + '/addTask', action.task)
                .then(res => {
                    if (res.data) {
                        action.task._id = res.data
                        dispatch(action)
                    } else {
                        alert('Failed change the task, please try agian')
                    }
                })
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
    return dispatch => {
        try {
            return axios.put(URL + '/editTask', action.task)
                .then(res => {
                    if (res) {
                        dispatch(action)
                    } else {
                        alert('Failed change the task, please try agian')
                    }
                })
        } catch (err) {
            console.log(err.massage)
        }
    }
}

export const showAll = () => {
    return {
        type: 'SHOW_ALL',
    }
}

export const hideDone = () => {
    return {
        type: 'HIDE_DONE',
    }
}

export const AddTaskContent = (content) => {
    return {
        type: 'FILTER',
        filter: content
    }
}

export const getTasks = () => {
    return dispatch => {
        try {
            return axios.get(URL + '/task')
                .then(res => {
                    dispatch(setTasks(res.data.tasks))
                })
        } catch (err) {
            console.log(err.massage)
        }
    }
}

export const setTasks = (tasks) => {
    return {
        type: 'GET_TASKS',
        tasks: tasks
    }
}

export const setFocusItem = (id) => {
    return {
        type: 'SET_FOCUS_ITEM',
        id
    }
}

export const setCoordinates = (coordinate) => {
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
    return dispatch => {
        try {
            return axios.put(URL + '/editDate', action.task)
                .then(res => {
                    if (res) {
                        dispatch(action)
                    } else {
                        alert('Failed change the task, please try agian')
                    }
                })
        } catch (err) {
            console.log(err.massage)
        }
    }
}