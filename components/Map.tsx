
import React, { useRef, useEffect, useState } from 'react';
import { MapPOI, Zone } from '../types';

// FIX: Declare mapboxgl as a global variable of type 'any' to inform TypeScript
// that it exists, resolving 'Cannot find name' and 'Cannot find namespace' errors.
declare const mapboxgl: any;

// IMPORTANT: Replace with your own Mapbox token in a .env file for a real application
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZmVzdGl2ZS1pbmRpYS1kZXYiLCJhIjoiY2x5a3N1aDQ4MDFpMjJrcWp2dG14dHlicCJ9.hKgF5v1L65552aVb2n1FdA'; // A public example token

interface MapProps {
  center: [number, number];
  zoom: number;
  pois?: MapPOI[];
  zones?: Zone[];
  interactive?: boolean;
}

export const MapWrapper: React.FC<MapProps> = ({ center, zoom, pois = [], zones = [], interactive = true }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  // FIX: Changed type from mapboxgl.Map to any because the full type definition
  // is not available, which caused a 'Cannot find namespace' error.
  const map = useRef<any | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    (mapboxgl as any).accessToken = MAPBOX_TOKEN;
    map.current = new (mapboxgl as any).Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
      interactive: interactive,
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Add zones
      zones.forEach(zone => {
        if (!map.current) return;
        map.current.addSource(zone.id, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [zone.bounds]
            }
          }
        });
        map.current.addLayer({
          'id': zone.id,
          'type': 'fill',
          'source': zone.id,
          'layout': {},
          'paint': {
            'fill-color': zone.color.replace('bg-', '#'), // A bit of a hack for mock data
            'fill-opacity': 0.3
          }
        });
      });

      // Add POIs
      pois.forEach(poi => {
        if (!map.current) return;
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = `url('https://placekitten.com/g/25/25')`; // Placeholder icon
        el.style.width = `25px`;
        el.style.height = `25px`;
        el.style.backgroundSize = '100%';

        const popup = new (mapboxgl as any).Popup({ offset: 25 })
          .setHTML(`<h3>${poi.name}</h3><p>${poi.type}</p>`);

        new (mapboxgl as any).Marker(el)
          .setLngLat(poi.coord as [number, number])
          .setPopup(popup)
          .addTo(map.current);
      });
    });

  }, [center, zoom, pois, zones, interactive]);

  return <div ref={mapContainer} className="w-full h-full" />;
};
