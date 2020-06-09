const initState = {
    tasks: [],
    filter: '',
    hide: false,
        focusItem: '',
        coordinate: [0,0]
}

const rootReducer = (state = initState, action) => {
    if (action.type === 'DELETE_TASK') {
        let focusId = state.focusItem
        if (state.focusItem === action.id) {
            focusId = ''
        }
        const tasks = state.tasks.filter(task => task._id !== action.id)
        return {
            ...state,
            tasks: tasks,
            focusItem: focusId
        }
    } else if (action.type === 'ADD_TASK') {
        return {
            ...state,
            tasks: [...state.tasks, action.task]
        }
    } else if (action.type === 'EDIT_TASK') {
        return {
            ...state,
            tasks: state.tasks.map(
                (task) => task._id === action.task.id ? {
                    ...task,
                    content: action.task.content,
                    IsConfirm: action.task.IsConfirm
                } : task)
        }
    } else if (action.type === 'SHOW_ALL') {
        return {
            ...state,
            hide: false
        }
    } else if (action.type === 'HIDE_DONE') {
        return {
            ...state,
            hide: true
        }
    } else if (action.type === 'FILTER') {
        return {
            ...state,
            filter: action.filter
        }
    } else if (action.type === 'GET_TASKS') {
        return {
            ...state,
            tasks: action.tasks
        }
    } else if (action.type === 'DELETE_DONE_TASKS') {
        return {
            ...state,
            tasks: state.tasks.filter(task => !action.id.includes(task._id))
        }
    } else if (action.type === 'SET_FOCUS_ITEM') {
        return {
            ...state,
            focusItem: action.id
        }
    } else if (action.type === 'SET_COORDINATES') {
        return {
            ...state,
            coordinate: action.coordinate
        }
    } else if (action.type === 'SET_DATE') {
        return {
            ...state,
            tasks: state.tasks.map(
                (task) => task._id === action.task.id ? {
                    ...task,
                    start: action.task.start,
                    end: action.task.end
                } : task)
        }
    }
    return state;
}

export default rootReducer