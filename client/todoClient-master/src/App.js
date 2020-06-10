import React from 'react'
import './App.css'
import ToDoList from './components/ToDoList.js'
import Timeline from './components/timeline.js'
import Map from './components/map.js'

function App() {
  return ( 
    <div className="app">
      <div className = 'todolist'>
        <ToDoList/>
      </div>
      <div className = 'timeline-map'>
        <Timeline/>
        <Map/>
      </div>
    </div>
  )
}

export default App
