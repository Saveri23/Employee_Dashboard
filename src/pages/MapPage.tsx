import { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  const [MapComponents, setMapComponents] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    import("react-leaflet").then((module) => {
      setMapComponents(module);
    });

     fetchEmployees().then((data) => {
    const raw = data.TABLE_DATA.data;

    const formatted = raw.map((item: any[]) => ({
      name: item[1],
      city: item[2],
      salary: item[3],
    }));

    setEmployees(formatted);
  });
  }, []);

  if (!MapComponents) return <div>Loading Map...</div>;

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  const cityCoordinates: any = {
    Delhi: [28.6139, 77.209],
    Mumbai: [19.076, 72.8777],
    Chennai: [13.0827, 80.2707],
    Bangalore: [12.9716, 77.5946],
    Hyderabad: [17.385, 78.4867],
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-premium p-6">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Employee Locations
        </h2>

        <MapContainer
          center={[20.5937, 78.9629] as any}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {employees.map((emp, index) => {
            const coords = cityCoordinates[emp.city];
            if (!coords) return null;

            return (
              <Marker key={index} position={coords as any}>
                <Popup>
                  <strong>{emp.name}</strong>
                  <br />
                  ₹ {emp.salary}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}