import axios from 'axios'
const URL = 'http://localhost:3001'

export const deleteTask = (id) => {
    const action = {type: 'DELETE_TASK',
                    id
                    }   
    return dispatch => {
        try {
            axios.delete(URL + `/deleteTask/${id}`)
            .then(res => {
                if (res.data) {
                    dispatch(action)
                    }
                    else {
                        alert('cant delete the task, please try agian')
                    }
                })
        }
        catch(err) {
            console.log(err)
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
                    }
                    else {
                        alert('cant delete all done tasks, please try agian')
                    }
                })
        }
        catch (err) {
                console.log(err)
        }
    }
}

export const AddTask = (task) => {
    const action = {
        type: 'ADD_TASK',
        task: {
            task: task,
            confirm: false
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
                    alert('cant change the task, please try agian')
                }
            })
        }
        catch (err) {
                console.log(err)
        }
    }
}

export const editTask = (id, task, confirm) => {
    const action = {
        type: 'EDIT_TASK',
        task: {
            id: id,
            task: task,
            confirm: confirm
        }
    }
    return dispatch => {
        try {
            return axios.put(URL + '/editTask', action.task)
            .then(res => {
                if (res) {
                    dispatch(action)
                } else {
                    alert('cant change the task, please try agian')
                }
            })
        }
        catch (err) {
            console.log(err)
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
        }
        catch (err) {
            console.log(err)
        }
    }
}

export const setTasks = (tasks) => {
    return {
        type: 'GET_TASKS',
        tasks: tasks
    }
}