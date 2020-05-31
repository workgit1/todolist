import React from 'react'
import { useSelector } from 'react-redux'
import './timeline.css'
import { Card } from '@material-ui/core';
import VisTimeline from 'react-visjs-timeline'

function Timeline() {
    const tasks = useSelector(state => state.tasks)
    const options = {
        width: '100%',
        height: '327px'
    }
    return ( 
        <Card className = 'timeline'>
        <VisTimeline options = {options} items = {tasks}/> 
        </Card>
    )
}

export default Timeline;