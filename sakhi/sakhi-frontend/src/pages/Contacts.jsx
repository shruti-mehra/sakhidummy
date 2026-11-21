import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Phone,
  UserRound,
  Users,
} from "lucide-react";
import {
  getContacts,
  addContact,
  deleteContact
} from "../services/api";

import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";


import { storage } from "../utils/storage";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    relation: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {

        
        const user = storage.getUser();

        if (!user) {
            return;
        }

        const data =
            await getContacts(user.id);

        setContacts(data);

    } catch (error) {

        console.error(
            "Failed to load contacts:",
            error
        );

    }
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {

        
        const user = storage.getUser();

        await addContact(user.id, {
            name: form.name,
            phone: form.phone,
            relation: form.relation,
        });

        await loadContacts();

    } catch (error) {

        console.error(
            "Failed to add contact:",
            error
        );

    }
};

const handleDelete = async (contactId) => {
  try {

      
      const user = storage.getUser();

      await deleteContact(
          contactId,
          user.id
      );

      await loadContacts();

  } catch (error) {

      console.error(
          "Failed to delete contact:",
          error
      );

  }
};

  return (
    <div className="min-h-screen bg-[#fff7f9] pb-24">
      <Navbar title="Trusted Contacts" />

      <main className="mx-auto max-w-3xl px-5 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Trusted Contacts
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              People who should be contacted during an emergency.
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="sakhi-gradient flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-md"
          >
            <Plus size={18} />
            Add
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleAdd}
            className="mt-6 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm"
          >
            <h3 className="font-bold text-gray-900">
              Add Trusted Contact
            </h3>

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="mt-4 grid gap-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Contact name"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-500"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                type="tel"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-500"
              />

              <input
                name="relation"
                value={form.relation}
                onChange={handleChange}
                placeholder="Relation e.g. Mother, Friend"
                className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-500"
              />

              <button
                type="submit"
                className="sakhi-gradient rounded-xl py-3 font-semibold text-white"
              >
                Save Contact
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 space-y-4">
          {contacts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <Users className="mx-auto text-gray-400" size={40} />

              <h3 className="mt-3 font-semibold text-gray-800">
                No trusted contacts
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add someone you trust to receive emergency alerts.
              </p>
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between rounded-2xl border border-rose-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                    <UserRound />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {contact.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {contact.relation || "Trusted Contact"}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                      <Phone size={14} />
                      {contact.phone}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(contact.id)}
                  className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 size={19} />
                </button>
              </div>
            ))
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

export default Contacts;