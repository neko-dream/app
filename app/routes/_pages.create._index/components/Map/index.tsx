import { useState, useEffect } from "react";
import {
  useMapEvents,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  onLatLngChange: (lat: number, lng: number) => void;
  initialPosition?: { lat: number; lng: number };
}

export default function Map({ onLatLngChange, initialPosition }: Props) {
  const [zoom, setZoom] = useState(18);

  const [position, setPosition] = useState<{ lat: number; lng: number }>(
    initialPosition || { lat: 35.6768927, lng: 139.752275 },
  );

  const handlePositionChange = (newPosition: { lat: number; lng: number }) => {
    setPosition(newPosition);
    onLatLngChange(newPosition.lat, newPosition.lng);
  };

  useEffect(() => {
    if (position.lat !== 35.6768927 && position.lng !== 139.752275) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        handlePositionChange(newPosition);
      },
      (error) => {
        console.error("位置情報の取得に失敗:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    );
  }, [onLatLngChange]);

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        handlePositionChange({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
        setZoom(map.getZoom());
      },
    });

    useEffect(() => {
      map.setView([position.lat, position.lng]);
    }, [map]);

    return (
      <Marker position={[position.lat, position.lng]}>
        <Popup>
          緯度: {position.lat.toFixed(6)}
          <br />
          経度: {position.lng.toFixed(6)}
        </Popup>
      </Marker>
    );
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
