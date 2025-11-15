
import React, { useRef, useEffect, useState } from 'react';
import { MapPOI, Zone } from '../types';
import { useStore } from '../store';

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
  const { state } = useStore();
  const theme = state.theme;

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    (mapboxgl as any).accessToken = MAPBOX_TOKEN;
    
    const mapStyle = theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/streets-v12';

    map.current = new (mapboxgl as any).Map({
      container: mapContainer.current,
      style: mapStyle,
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
        // Use an embedded SVG for the marker to avoid external file dependencies
        el.style.backgroundImage = `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNFMjcyNUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjEgMTBjMCA3LTkgMTMtOSAxMy05LTUtOS02LTktMTNhOSw5LDAsMCwxLDE4LDBaIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMCIgcj0iMyI+PC9jaXJjbGU+PC9zdmc+')`;
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
    
    return () => {
        if(map.current) {
            map.current.remove();
            map.current = null;
        }
    };

  }, [center, zoom, pois, zones, interactive, theme]);

  return <div ref={mapContainer} className="w-full h-full" />;
};