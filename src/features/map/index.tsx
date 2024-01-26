'use client';

import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import 'ol/ol.css';
import { useGeographic } from 'ol/proj.js';
import VectorLayer from 'ol/layer/Vector';
import ScaleLineControl from 'ol/control/ScaleLine';
import { Zoom } from 'ol/control';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

const MapComponent = () => {
    const [, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(typeof window !== 'undefined');
    }, []);

    useGeographic();

    const mapTargetElement = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map>();

    const mapRef = useRef<Map>();
    mapRef.current = map;
    const [zoom, setZoom] = useState<number | undefined>(16);

    const scaleLineControl = new ScaleLineControl();
    const zoomControl = new Zoom({});

    const CairoPosition = [31.299, 30.0998];

    useEffect(() => {
        const map = new Map({
            layers: [
                new TileLayer({ source: new OSM() }),
                new VectorLayer({
                    source: new VectorSource({
                        features: [new Feature(new Point(CairoPosition))],
                    }),
                    style: {
                        'circle-radius': 15,
                        'circle-fill-color': '#1f6fde',
                    },
                }),
            ],
            controls: [scaleLineControl, zoomControl],
            view: new View({
                center: CairoPosition,
                zoom: zoom,
                minZoom: 0,
                maxZoom: 28,
            }),
        });

        map.setTarget(mapTargetElement.current || '');
        setMap(map);

        return () => map.setTarget('');
    }, []);

    const handleWheel = () => {
        if (map) {
            const actualZoom = map.getView().getZoom();
            setZoom(actualZoom);
        }
    };

    return (
        <div ref={mapTargetElement} className="map" onWheel={handleWheel}></div>
    );
};

export default MapComponent;
