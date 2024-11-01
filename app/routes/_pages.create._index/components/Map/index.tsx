import { useMapEvents, MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface Props {
  zoom: number;
  onZoom: (zoom: number) => void;
  onLatLngChange: (lat: number, lng: number) => void;
  position: { lat: number; lng: number };
}

export default function Map({ onLatLngChange, position, zoom, onZoom }: Props) {
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        onLatLngChange(e.latlng.lat, e.latlng.lng);
        onZoom(map.getZoom());
      },
    });

    useEffect(() => {
      map.setView([position.lat, position.lng]);
    }, [map]);

    return <Marker draggable={true} position={[position.lat, position.lng]} />;
  }

  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={zoom}
      style={{ height: "40vh", width: "100%" }}
    >
      <TileLayer
        attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>"'
        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
