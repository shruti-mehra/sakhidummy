

import { useState } from "react";
import { AlertTriangle, MapPin } from "lucide-react";
import { sendSOS } from "../services/api";
import { storage } from "../utils/storage";

function SOSButton() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const handleSOS = () => {
    const user = storage.getUser();

    if (!user) {
      setMessage("Please login first.");
      return;
    }

    setSending(true);
    setMessage("Getting location...");

    if (!navigator.geolocation) {
      setMessage("Location is not supported by this browser.");
      setSending(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          await sendSOS({
            userId: user.id,
            latitude: latitude,
            longitude: longitude,
          });

          setMessage("SOS alert sent successfully.");

        } catch (error) {
          console.error("SOS error:", error);

          setMessage(
            error.message || "Failed to send SOS."
          );

        } finally {
          setSending(false);
        }
      },

      (error) => {
        console.error("Location error:", error);

        setMessage(
          "Please allow location access."
        );

        setSending(false);
      }
    );
  };

  return (
    <div className="flex flex-col items-center">

      <button
        onClick={handleSOS}
        disabled={sending}
        className={`sos-pulse flex h-56 w-56 items-center justify-center rounded-full border-[10px] border-rose-200 bg-rose-600 text-white shadow-2xl transition hover:scale-105 active:scale-95 ${
          sending
            ? "cursor-not-allowed opacity-70"
            : ""
        }`}
      >

        <div className="flex flex-col items-center">

          <AlertTriangle
            size={48}
            strokeWidth={2.5}
          />

          <span className="mt-2 text-4xl font-black">
            {sending ? "..." : "SOS"}
          </span>

          <span className="mt-1 text-xs font-medium">
            {sending ? "Sending" : "Emergency"}
          </span>

        </div>

      </button>

      <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">

        <MapPin size={16} />

        <span>
          Location will be shared with trusted contacts
        </span>

      </div>

      {message && (
        <div className="mt-4 max-w-md rounded-xl bg-rose-50 px-4 py-3 text-center text-sm text-rose-700">
          {message}
        </div>
      )}

    </div>
  );
}

export default SOSButton;