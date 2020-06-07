import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFocusItem, setDate } from '../actions/taskActions'
import './timeline.css'
import { Card } from '@material-ui/core';
import VisTimeline from 'react-visjs-timeline'

function Timeline() {
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const options = {
        width: '100%',
        height: '327px',
        editable: {
            updateTime: true
        },
        itemsAlwaysDraggable: true,
        onMove: (e) => {
            dispatch(setDate(e.id, e.start, e.end))
        }
    }
    const items = tasks
    var i;
    for(i = 0; i < items.length; i++){
        items[i].id = items[i]['_id'];
    }
    const onSelect = (properties) => {
        if(properties.item) {
            dispatch(setFocusItem(properties.item))
        } 
    }

    return ( 
        <Card className = 'timeline'>
        <VisTimeline options = {options} items = {items} clickHandler={onSelect}/> 
        </Card>
        
    )
}

export default Timeline;