// const API_BASE_URL = "http://localhost:8081/api";
const API_BASE_URL =
    `${import.meta.env.VITE_API_BASE_URL}/api`;

async function request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    const text = await response.text();

    let data;

    try {
        data = text ? JSON.parse(text) : null;
    } catch {
        data = text;
    }

    if (!response.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : data?.message || "Something went wrong"
        );
    }

    return data;
}


// ========================================
// AUTH
// ========================================

export const registerUser = (userData) => {
    return request("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
};

export const loginUser = (loginData) => {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify(loginData)
    });
};


// ========================================
// CONTACTS
// ========================================

export const getContacts = (userId) => {
    return request(`/contacts?userId=${userId}`);
};

export const addContact = (userId, contactData) => {
    return request(`/contacts?userId=${userId}`, {
        method: "POST",
        body: JSON.stringify(contactData)
    });
};

export const deleteContact = (contactId, userId) => {
    return request(`/contacts/${contactId}?userId=${userId}`, {
        method: "DELETE"
    });
};


// ========================================
// SOS
// ========================================

export const sendSOS = (sosData) => {
    return request("/sos", {
        method: "POST",
        body: JSON.stringify(sosData)
    });
};

export const getSOSHistory = (userId) => {
    return request(`/sos?userId=${userId}`);
};


// ========================================
// BACKWARD COMPATIBILITY
// ========================================

export const api = {
    registerUser,
    loginUser,
    getContacts,
    addContact,
    deleteContact,
    sendSOS,
    getSOSHistory
};