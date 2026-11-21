import { useState } from "react";
import { LogOut, User, Mail, Phone, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

import { storage } from "../utils/storage";

function Profile() {
  const navigate = useNavigate();

  const [user] = useState(storage.getUser());

  const handleLogout = () => {
    storage.removeUser();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#fff7f9] pb-24">
      <Navbar title="My Profile" />

      <main className="mx-auto max-w-2xl px-5 py-8">
        <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="sakhi-gradient flex h-24 w-24 items-center justify-center rounded-full text-4xl font-bold text-white shadow-lg">
              {user?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {user?.name}
            </h2>

            <p className="text-sm text-gray-500">
              SAKHI Member
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Info
              icon={User}
              label="Full Name"
              value={user?.name}
            />

            <Info
              icon={Mail}
              label="Email"
              value={user?.email}
            />

            <Info
              icon={Phone}
              label="Phone"
              value={user?.phone}
            />
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-5">
          <div className="flex gap-3">
            <ShieldCheck className="text-green-600" />

            <div>
              <h3 className="font-semibold text-green-800">
                Your Safety Matters
              </h3>

              <p className="mt-1 text-sm text-green-700">
                Keep your account and trusted contact information
                up to date.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-3 font-semibold text-red-600 hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </main>

      <BottomNav />
    </div>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
      <div className="text-rose-600">
        <Icon size={20} />
      </div>

      <div>
        <p className="text-xs text-gray-400">
          {label}
        </p>

        <p className="font-medium text-gray-800">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
}

export default Profile;