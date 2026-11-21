import { Navigate, Route, Routes } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import History from "./pages/History";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contacts"
        element={
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Default */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* 404 */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;