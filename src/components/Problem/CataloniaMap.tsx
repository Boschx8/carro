import { useState } from 'react'
import Map, { Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

export const VISITED_STORES: { name: string; lon: number; lat: number }[] = [
  // Esclat
  { name: 'Esclat Mollet del Vallès',  lon: 2.2140, lat: 41.5375 },
  { name: 'Esclat Santa Perpètua',     lon: 2.1786, lat: 41.5345 },
  { name: 'Esclat Canovelles',          lon: 2.2870, lat: 41.6183 },
  // Bon Preu Barcelona
  { name: 'Bon Preu Barcelona #49',   lon: 2.1520, lat: 41.3970 },
  { name: 'Bon Preu Barcelona #50',   lon: 2.1630, lat: 41.3880 },
  { name: 'Bon Preu Barcelona #63',   lon: 2.1750, lat: 41.3950 },
  { name: 'Bon Preu Barcelona #153',  lon: 2.1450, lat: 41.4010 },
  { name: 'Bon Preu Barcelona #158',  lon: 2.1590, lat: 41.3820 },
  { name: 'Bon Preu Barcelona #214',  lon: 2.1700, lat: 41.4040 },
]

function StoreMarker({ name, hovered, onHover, onLeave }: {
  name: string
  hovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  return (
    <div
      className="relative flex items-center justify-center cursor-pointer"
      style={{ width: 36, height: 36 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Pulsing ring */}
      <div className="absolute w-8 h-8 rounded-full bg-[#9B2335] animate-ping opacity-40" />
      {/* Core dot */}
      <div
        className="relative w-4 h-4 rounded-full bg-[#c84b5a]"
        style={{
          border: '2px solid rgba(255,255,255,0.3)',
          boxShadow: '0 0 14px rgba(200,75,90,0.9), 0 0 5px rgba(200,75,90,1)',
        }}
      />
      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none"
          style={{
            background: 'rgba(9,9,9,0.93)',
            border: '1px solid rgba(200,75,90,0.55)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 14px rgba(155,35,53,0.35)',
          }}
        >
          {name}
        </div>
      )}
    </div>
  )
}

export default function CataloniaMap() {
  const [hoveredStore, setHoveredStore] = useState<string | null>(null)

  return (
    <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden border border-white/5">
      <Map
        initialViewState={{
          longitude: 1.5,
          latitude: 41.65,
          zoom: 7.1,
          pitch: 44,
          bearing: -8,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        attributionControl={false}
        dragRotate
        pitchWithRotate
      >
        {VISITED_STORES.map(store => (
          <Marker
            key={store.name}
            longitude={store.lon}
            latitude={store.lat}
            anchor="center"
          >
            <StoreMarker
              name={store.name}
              hovered={hoveredStore === store.name}
              onHover={() => setHoveredStore(store.name)}
              onLeave={() => setHoveredStore(null)}
            />
          </Marker>
        ))}
      </Map>

      <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
        <div className="px-4 py-1.5 rounded-full bg-black/55 border border-white/8 text-slate-600 text-xs">
          Arrossega per explorar · scroll per zoom · clic dret per inclinar
        </div>
      </div>
    </div>
  )
}
