import React, {useEffect} from 'react'
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {transform} from 'ol/proj';
// import { useSelector } from 'react-redux'
import './map.css'

function MapShow() { 
    useEffect(() => {
        new Map({
            target: 'map',
            layers: [
                new TileLayer({
                source: new OSM()
                })
            ],
            view: new View({
                center: transform([ 34.8516, 31.0461 ],"EPSG:4326","EPSG:3857"),
                zoom: 6
            })
        });
    },[])

    return(
        <div id="map">
        </div>
    )
}

export default MapShow;