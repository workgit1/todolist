const initState = {
    tasks: [],
    filterByContent: '',
    filterByStatusConfirm: false,
    focusItem: '',
    coordinate: [0,0],
    lastAction: 'GET_TASKS'
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
            focusItem: focusId,
            lastAction: action.type
        }
    } else if (action.type === 'ADD_TASK') {
        return {
            ...state,
            tasks: [...state.tasks, action.task],
            lastAction: action.type
        }
    } else if (action.type === 'EDIT_TASK') {
        return {
            ...state,
            tasks: state.tasks.map(
                task => task._id === action.task.id ? {
                    ...task,
                    content: action.task.content,
                    IsConfirm: action.task.IsConfirm
                } : task),
            lastAction: action.type
        }
    } else if (action.type === 'FILTER_DONE_TASKS') {
        return {
            ...state,
            filterByStatusConfirm: !state.filterByStatusConfirm,
            lastAction: action.type
        }
    } else if (action.type === 'FILTER') {
        return {
            ...state,
            filterByContent: action.filterByContent,
            lastAction: action.type
        }
    } else if (action.type === 'GET_TASKS') {
        return {
            ...state,
            tasks: action.tasks,
            lastAction: action.type
        }
    } else if (action.type === 'DELETE_DONE_TASKS') {
        let focusId = state.focusItem
        if (action.id.includes(focusId)) {
            focusId = ''
        }
        return {
            ...state,
            tasks: state.tasks.filter(task => !action.id.includes(task._id)),
            lastAction: action.type,
            focusItem: focusId
        }
    } else if (action.type === 'SET_FOCUS_ITEM') {
        return {
            ...state,
            focusItem: action.id,
            lastAction: action.type
        }
    } else if (action.type === 'SET_COORDINATES') {
        return {
            ...state,
            coordinate: action.coordinate,
            lastAction: action.type
        }
    } else if (action.type === 'SET_DATE') {
        return {
            ...state,
            tasks: state.tasks.map(
                task => task._id === action.task.id ? {
                    ...task,
                    start: action.task.start,
                    end: action.task.end
                } : task),
            lastAction: action.type
        }
    }
    return state
}

export default rootReducer
