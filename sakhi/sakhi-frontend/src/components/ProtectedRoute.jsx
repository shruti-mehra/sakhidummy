import { Navigate } from "react-router-dom";
import { storage } from "../utils/storage";

function ProtectedRoute({ children }) {
  const user = storage.getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;