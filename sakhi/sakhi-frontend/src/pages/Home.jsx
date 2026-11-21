import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Users,
  History,
  MapPin,
  HeartHandshake,
} from "lucide-react";

import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import SOSButton from "../components/SOSButton";
import StatCard from "../components/StatCard";

import { storage } from "../utils/storage";
import { api } from "../services/api";

function Home() {
  const user = storage.getUser();

  const [contacts, setContacts] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  
  const loadData = async () => {
    try {
        if (!user?.id) {
            return;
        }

        const contactsData = await api.getContacts(user.id);
        const alertsData = await api.getSOSHistory(user.id);

        setContacts(contactsData);
        setAlerts(alertsData);

    } catch (error) {
        console.error("Failed to load home data:", error);
    }
};

  return (
    <div className="min-h-screen bg-[#fff7f9] pb-24">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-8">
        <section>
          <p className="text-sm font-medium text-rose-600">
            Hello, {user?.name || "there"} 👋
          </p>

          <h2 className="mt-1 text-3xl font-black text-gray-900">
            Stay Safe. Stay Connected.
          </h2>

          <p className="mt-2 max-w-xl text-gray-500">
            Your trusted safety companion is always with you.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-rose-100 bg-white px-5 py-10 shadow-sm">
          <div className="mb-8 text-center">
            <h3 className="text-xl font-bold text-gray-900">
              Emergency SOS
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Press the button if you feel unsafe.
            </p>
          </div>

          <SOSButton />
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={Users}
            title="Trusted Contacts"
            value={contacts.length}
            description="People who can receive alerts"
          />

          <StatCard
            icon={History}
            title="SOS Alerts"
            value={alerts.length}
            description="Emergency alerts recorded"
          />

          <StatCard
            icon={MapPin}
            title="Location"
            value="Ready"
            description="GPS available when permitted"
          />
        </section>

        <section className="mt-8 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 p-6 text-white shadow-md">
          <div className="flex gap-4">
            <HeartHandshake className="shrink-0" size={30} />

            <div>
              <h3 className="font-bold">
                Safety Reminder
              </h3>

              <p className="mt-1 text-sm text-rose-50">
                Keep your trusted contacts updated so they can respond
                quickly during an emergency.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-rose-600" />

            <div>
              <h3 className="font-semibold text-gray-900">
                How SAKHI works
              </h3>

              <p className="text-sm text-gray-500">
                Activate SOS → Get location → Notify trusted contacts
              </p>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

export default Home;