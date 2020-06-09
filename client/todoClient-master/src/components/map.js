import React, {useEffect, useState, useRef} from 'react'
import 'ol/ol.css'
import { Map, View } from 'ol'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { OSM, Vector as VectorSource } from 'ol/source'
import Overlay from 'ol/Overlay'
import { transform } from 'ol/proj'
import { useSelector, useDispatch } from 'react-redux'
import './map.css'
import { setCoordinates } from '../actions/taskActions'
import Point from "ol/geom/Point"
import Feature from "ol/Feature"

const mapTemplate = () => new Map({
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

const popupTemplate = (container) => new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
})

function MapShow() { 
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.tasks)
    const focusItem = useSelector(state => state.focusItem)
    const content = useRef()
    const container = useRef()
    const [map, setMap] = useState(null)
    const format = (x, y) => {
        const z = {
            M: x.getMonth() + 1,
            d: x.getDate(),
            h: x.getHours(),
            m: x.getMinutes(),
            s: x.getSeconds()
        };
        y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
            return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
        });
    
        return y.replace(/(y+)/g, function(v) {
            return x.getFullYear().toString().slice(-v.length)
        })
    }

    const flyTo = (location, view) => {
        var duration = 2000;
        var zoom = view.getZoom();
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

    const setPopup = (feature, coordinate, map) => {
        const TaskInfo = feature.values_.content
        content.current.innerText = "content: " + TaskInfo.content + '\r'
                            + "date: " + format(new Date(TaskInfo.start), 'dd/MM/yyyy hh:mm') + 
                            " - " + format(new Date(TaskInfo.end), 'dd/MM/yyyy hh:mm') + '\r'
        const popup = map.overlays_.array_[0]
        popup.setPosition(coordinate);
        feature.set('popup', popup)
    }

    useEffect(() => {
        const popup = popupTemplate(container.current)
        const map = mapTemplate()
        map.addOverlay(popup)
        map.on('singleclick', (e) => {
            const feature = map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
                return feature
            })
            if (feature) {
                setPopup(feature, e.coordinate, map)
            }
            else {
                popup.setPosition(undefined);
            }
            dispatch(setCoordinates(transform(e.coordinate,"EPSG:3857","EPSG:4326")))
        })
        setMap(map)
    }, [])
    
    useEffect(() => {
        if(map) {
            map.getLayers().forEach(layer => {
                layer.get('name') === 'markerVectorLayer' && map.removeLayer(layer)
            })
            const marker = tasks.map(task => {
                return new Feature({
                    geometry: new Point(transform(task.coordinate, "EPSG:4326","EPSG:3857")),
                    content: task
                })
            })
            const markers = new VectorSource({features: marker})
            const markerVectorLayer = new VectorLayer({name: 'markerVectorLayer',  source : markers})
            map.addLayer(markerVectorLayer);
            if (focusItem) {
                const coordinate = tasks.find( task => task._id === focusItem).coordinate
                const feature = marker.filter(feature => {
                    return feature.values_.content._id == focusItem
                })[0]
                setPopup(feature, transform(coordinate,"EPSG:4326","EPSG:3857"), map)
                // map.getView().setCenter(transform(coordinate, 'EPSG:4326', 'EPSG:3857'))
                flyTo(transform(coordinate, 'EPSG:4326', 'EPSG:3857'), map.getView())
            } else {
                map.overlays_.array_[0].setPosition(undefined);
            }
        }
    }, [map, tasks, focusItem])

    return(
        <div>
            <div id="map"></div>
            <div id="popup" ref={container} title="myproject" class="ol-popup"><a href="#" id="popup-closer" class="ol-popup-closer"></a><div id="popup-content" ref={content}></div></div>
        </div>
    )
}

export default MapShow;
