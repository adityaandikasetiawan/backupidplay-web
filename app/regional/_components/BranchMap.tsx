'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {
  ssr: false
});
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {
  ssr: false
});
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

export interface Branch {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

type BranchMapProps = {
  branches?: Branch[];
  center?: [number, number];
  zoom?: number;
};

const defaultBranches: Branch[] = [
  {
    id: 1,
    name: 'Cabang Jakarta',
    lat: -6.1582,
    lng: 106.9006
  },
  { id: 2, name: 'Cabang Surabaya', lat: -7.25, lng: 112.75 }
];

export default function BranchMap({ branches = defaultBranches, center = [-6.1582, 106.9006], zoom = 13 }: BranchMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [redMarkerIcon, setRedMarkerIcon] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then((L) => {
      const icon = L.default.icon({
        iconUrl:
          'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
        iconSize: [25, 25],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38],
        shadowSize: [41, 41]
      });
      setRedMarkerIcon(icon);
    });
  }, []);

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Cari cabang..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSearchQuery('')}
          disabled={!searchQuery}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Map */}
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '500px', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredBranches.map((branch) => (
          <Marker
            key={branch.id}
            position={[branch.lat, branch.lng]}
            icon={redMarkerIcon}
          >
            <Popup>{branch.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
