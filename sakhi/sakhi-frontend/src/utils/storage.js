const USER_KEY = "sakhi_user";
const CONTACTS_KEY = "sakhi_contacts";
const ALERTS_KEY = "sakhi_alerts";

export const storage = {
  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },

  getContacts() {
    const contacts = localStorage.getItem(CONTACTS_KEY);
    return contacts ? JSON.parse(contacts) : [];
  },

  setContacts(contacts) {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  },

  getAlerts() {
    const alerts = localStorage.getItem(ALERTS_KEY);
    return alerts ? JSON.parse(alerts) : [];
  },

  setAlerts(alerts) {
    localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
  },
};