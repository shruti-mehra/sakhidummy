import { useEffect, useState } from "react";
import {
  History as HistoryIcon,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

import { getSOSHistory } from "../services/api";
import { storage } from "../utils/storage";

function History() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    const loadHistory = async () => {

        try {

            
            const user = storage.getUser();

            if (!user) {
                return;
            }

            const data =
                await getSOSHistory(user.id);

            setAlerts(data);

        } catch (error) {

            console.error(
                "Failed to load SOS history:",
                error
            );

        }

    };

    loadHistory();

}, []);

  

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#fff7f9] pb-24">
      <Navbar title="SOS History" />

      <main className="mx-auto max-w-3xl px-5 py-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            SOS History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Review your previous emergency alerts.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {alerts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <HistoryIcon
                className="mx-auto text-gray-400"
                size={42}
              />

              <h3 className="mt-3 font-semibold">
                No SOS alerts yet
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Your emergency alert history will appear here.
              </p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <CheckCircle size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        SOS Alert
                      </h3>

                      <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                        <Clock size={14} />
                        {formatDate(alert.timestamp)}
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                    {alert.status}
                  </span>
                </div>

                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={17} />

                    {alert.latitude && alert.longitude ? (
                      <span>
                        Location captured:{" "}
                        {alert.latitude.toFixed(5)},{" "}
                        {alert.longitude.toFixed(5)}
                      </span>
                    ) : (
                      <span>Location unavailable</span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    Contacts notified: {alert.contactsNotified}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default History;