import React, {useEffect, useState, useRef} from 'react'
import 'ol/ol.css'
import { Map as CreateMap, View } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM, Vector as VectorSource } from 'ol/source'
import Overlay from 'ol/Overlay'
import { transform } from 'ol/proj'
import { useSelector, useDispatch } from 'react-redux'
import './map.css'
import { setCoordinates } from '../actions/taskActions'
import Point from "ol/geom/Point"
import Feature from "ol/Feature"
import {format} from "../timeFormat"
import {tasksSelector, focusItemSelector} from "../selectors/selectors"


const mapTemplate = () => new CreateMap({
    target: 'map',
    layers: [
        new TileLayer({
        source: new OSM()
        }),
    ],
    view: new View({
        center: transform([ 34.8516, 31.0461 ],"EPSG:4326","EPSG:3857"),
        zoom: 6
    }),
})

const popupTemplate = container => new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
})

function Map() { 
    const dispatch = useDispatch()
    const tasks = useSelector(tasksSelector)
    const focusItem = useSelector(focusItemSelector)
    const content = useRef()
    const container = useRef()
    const [map, setMap] = useState(null)
    const [tasksDotsMarker, setTasksDotsMarker] = useState(null)
    const flyTo = (location, view) => {
        let duration = 2000
        let zoom = view.getZoom()
        view.animate({
          center: location,
          duration: duration
        })
        view.animate({
          zoom: zoom - 1,
          duration: duration / 2
        }, {
          zoom: zoom,
          duration: duration / 2
        })
    }

    const setPopup = (feature, coordinate, popup) => {
        const TaskInfo = feature.values_.content
        content.current.innerText = `content: ${TaskInfo.content} \r
                            date: ${format(new Date(TaskInfo.start), 'dd/MM/yyyy hh:mm')} 
                             - ${format(new Date(TaskInfo.end), 'dd/MM/yyyy hh:mm')}`
        popup.setPosition(coordinate)
        feature.set('popup', popup)
    }

    useEffect(() => {
        const popup = popupTemplate(container.current)
        const map = mapTemplate()
        map.addOverlay(popup)
        map.on('singleclick', e => {
            const feature = map.forEachFeatureAtPixel(e.pixel, (feature, layer) => feature)
            feature ? setPopup(feature, e.coordinate, popup) : popup.setPosition(undefined)
            dispatch(setCoordinates(transform(e.coordinate,"EPSG:3857","EPSG:4326")))
        })
        setMap(map)
    }, [])
    
    useEffect(() => {
        if(map) {
            map.getLayers().forEach(layer => {
                layer.get('name') === 'tasksDotsMarkerVectorLayer' && map.removeLayer(layer)
            })
            const tempTasksDotsMarker = tasks.map(task => {
                return new Feature({
                    geometry: new Point(transform(task.coordinate, "EPSG:4326","EPSG:3857")),
                    content: task
                })
            })
            const tasksDotsMarkers = new VectorSource({features: tempTasksDotsMarker})
            const tasksDotsMarkerVectorLayer = new VectorLayer({name: 'tasksDotsMarkerVectorLayer',  source : tasksDotsMarkers})
            map.addLayer(tasksDotsMarkerVectorLayer)
            setTasksDotsMarker(tempTasksDotsMarker)
        }
    }, [map, tasks])

    useEffect(() => {
        if(map) {
            if (focusItem) {
                const coordinate = tasks.find( task => task._id === focusItem).coordinate
                const feature = tasksDotsMarker.find(feature => feature.values_.content._id === focusItem)
                setPopup(feature, transform(coordinate,"EPSG:4326","EPSG:3857"), map.overlays_.array_[0])
                flyTo(transform(coordinate, 'EPSG:4326', 'EPSG:3857'), map.getView())
            } else {
                map.overlays_.array_[0].setPosition(undefined)
            }
        }
    }, [focusItem])

    return(
        <React.Fragment>
            <div id="map"></div>
            <div id="popup" ref={container} title="myproject" class="ol-popup"><a href="#" id="popup-closer" class="ol-popup-closer"></a><div id="popup-content" ref={content}></div></div>
        </React.Fragment>
    )
}

export default Map
