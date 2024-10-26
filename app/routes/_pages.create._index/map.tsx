import { useState, useEffect, useCallback, Suspense } from "react";
import { useMapEvents, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// export default function MapSelector() {
//     const [position, setPosition] = useState<{ lat: number; lng: number }>({ lat: 35.6768927, lng: 139.752275 });
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // 現在位置の取得
//         navigator.geolocation.getCurrentPosition(
//             (pos) => {
//                 const { latitude, longitude } = pos.coords;
//                 setPosition({ lat: latitude, lng: longitude });
//                 setIsLoading(false);
//             },
//             (error) => {
//                 console.error('位置情報の取得に失敗:', error);
//                 setIsLoading(false);
//             },
//             {
//                 enableHighAccuracy: true,
//                 maximumAge: 0
//             }
//         );
//     }, []);

//     function LocationMarker() {
//         const map = useMapEvents({
//             click(e) {
//                 setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
//             }
//         });

//         // 位置が変更されたら地図の中心を移動
//         useEffect(() => {
//             map.setView([position.lat, position.lng]);
//         }, [map]);

//         return (
//             <Marker position={[position.lat, position.lng]}>
//                 <Popup>
//                     緯度: {position.lat.toFixed(6)}<br />
//                     経度: {position.lng.toFixed(6)}
//                 </Popup>
//             </Marker>
//         );
//     }

//     if (isLoading) {
//         return <div>位置情報を取得中...</div>;
//     }

//     return (
//         <MapContainer
//             center={[position.lat, position.lng]}
//             zoom={18}
//             style={{ height: "40vh", width: "100%" }}
//         >
//             <TileLayer
//                 attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>"'
//                 url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
//             />
//             <LocationMarker />
//         </MapContainer>
//     );
// }

// MapSelector.tsx
interface MapSelectorProps {
    onLatLngChange: (lat: number, lng: number) => void;
    onZoomChange?: (zoom: number) => void;
    zoom: number;
    initialPosition?: { lat: number; lng: number };
}


export default function MapSelector({ onLatLngChange, initialPosition, onZoomChange, zoom }: MapSelectorProps) {
    const [position, setPosition] = useState<{ lat: number; lng: number }>(
        initialPosition || { lat: 35.6768927, lng: 139.752275 }
    );

    const handlePositionChange = (newPosition: { lat: number; lng: number }) => {
        setPosition(newPosition);
        onLatLngChange(newPosition.lat, newPosition.lng);
    };


    useEffect(() => {
        if (position.lat !== 35.6768927 && position.lng !== 139.752275) return
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const newPosition = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                };
                handlePositionChange(newPosition);
            },
            (error) => {
                console.error('位置情報の取得に失敗:', error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0
            }
        );
    }, [onLatLngChange]);


    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                handlePositionChange({
                    lat: e.latlng.lat,
                    lng: e.latlng.lng
                });
                if (onZoomChange) {
                    onZoomChange(map.getZoom());
                }
            }
        });

        useEffect(() => {
            map.setView([position.lat, position.lng]);
        }, [map]);

        return (
            <Marker position={[position.lat, position.lng]}>
                <Popup>
                    緯度: {position.lat.toFixed(6)}<br />
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
