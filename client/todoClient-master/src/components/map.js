import React, {useEffect} from 'react'
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { transform } from 'ol/proj';
import { useSelector, useDispatch } from 'react-redux'
import './map.css'
import { setCoordinates } from '../actions/taskActions'
import Point from "ol/geom/Point"
import Feature from "ol/Feature"

function MapShow() { 
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const focusItem = useSelector(state => state.focusItem)
 
    if (document.getElementById("map")){
        document.getElementById("map").innerHTML = ""
    }
    const marker = tasks.map(task => {
        return new Feature({
            geometry: new Point(transform(task.coordinate, "EPSG:4326","EPSG:3857"))
        })
    })
    const markers = new VectorSource({
        features: marker
    })
    const markerVectorLayer = new VectorLayer({
        source: markers
    })
    const map = new Map({
        target: 'map',
        layers: [
            new TileLayer({
            source: new OSM()
            }),
            markerVectorLayer
        ],
        view: new View({
            center: transform([ 34.8516, 31.0461 ],"EPSG:4326","EPSG:3857"),
            zoom: 6
        })
    });

    map.on('singleclick', (e) => {
        dispatch(setCoordinates(transform(e.coordinate,"EPSG:3857","EPSG:4326")))
    })
    
    useEffect(() => {
        if (focusItem) {
            const coordinate = tasks.find( task => task._id === focusItem).coordinate
            map.getView().setCenter(transform(coordinate, 'EPSG:4326', 'EPSG:3857'))
        }
    }, [focusItem])

    return(
        <div id="map">
        </div>
    )
}

export default MapShow;