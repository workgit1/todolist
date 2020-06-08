import React, {useEffect, useMemo} from 'react'
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import Overlay from 'ol/Overlay';
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
    const content = document.getElementById('popup-content');
    const marker = useMemo(() => {
        return tasks.map(task => {
            return new Feature({
                geometry: new Point(transform(task.coordinate, "EPSG:4326","EPSG:3857")),
                content: task
            })
        })
    }, [ tasks ])

    const markers = useMemo(() => {
        return new VectorSource({
        features: marker
        })
    }, [ marker ])

    const markerVectorLayer = useMemo(() => {
        return new VectorLayer({
        source: markers
        })
    }, [ markers ])

    const map = useMemo(() => {
        return new Map({
            target: 'map',
            layers: [
                new TileLayer({
                source: new OSM()
                }),
                markerVectorLayer
            ],
            view: new View({
                center: transform([ 34.8516, 31.0461 ],"EPSG:4326","EPSG:3857"),
                zoom: 6,
            }),
        });
    }, [markerVectorLayer])

    const container = document.getElementById('popup');
    const popup = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });
    map.addOverlay(popup);

    const format = function date2str(x, y) {
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
        });
    }

    const setPopup = (feature, coordinate) => {
        const TaskInfo = feature.values_.content
        content.innerHTML = "content: " + TaskInfo.content + "<br\>"
                            + "date: " + format(new Date(TaskInfo.start), 'dd/MM/yyyy hh:mm') + 
                            " - " + format(new Date(TaskInfo.end), 'dd/MM/yyyy hh:mm') + "<br\>"
        popup.setPosition(coordinate);
        feature.set('popup', popup)
        // map.getView().setCenter(transform(coordinate, 'EPSG:4326', 'EPSG:3857'))
    }
    map.on('singleclick', (e) => {
        const feature = map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {
            return feature
        })
        if (feature) {
            setPopup(feature, e.coordinate)
        }
        else {
            popup.setPosition(undefined);
        }
        dispatch(setCoordinates(transform(e.coordinate,"EPSG:3857","EPSG:4326")))
    })
    
    useEffect(() => {
        if (focusItem) {
            const coordinate = tasks.find( task => task._id === focusItem).coordinate
            const feature = marker.filter(feature => {
                return feature.values_.content._id == focusItem
            })[0]
            setPopup(feature, transform(coordinate,"EPSG:4326","EPSG:3857"))
            map.getView().setCenter(transform(coordinate, 'EPSG:4326', 'EPSG:3857'))
        }
    }, [focusItem])

    return(
        <div>
            <div id="map">
            </div>
            <div id="popup" title="myproject" class="ol-popup"><a href="#" id="popup-closer" class="ol-popup-closer"></a><div id="popup-content"></div></div>
        </div>
    )
}

export default MapShow;
