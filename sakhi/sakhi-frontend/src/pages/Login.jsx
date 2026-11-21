import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import { loginUser } from "../services/api";
import { storage } from "../utils/storage";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {

        const user = await loginUser({
            email: form.email,
            password: form.password,
        });

        
        storage.setUser(user);

        navigate("/home");

    } catch (error) {

        console.error("Login error:", error);

        setError(
            error.message ||
            "Invalid email or password."
        );

    } finally {
        setLoading(false);
    }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-5 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="sakhi-gradient mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg">
            <ShieldCheck size={35} />
          </div>

          <h1 className="mt-4 text-3xl font-black text-rose-700">
            SAKHI
          </h1>

          <p className="mt-2 text-gray-500">
            Your safety companion
          </p>
        </div>

        <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome Back
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Login to access your safety dashboard.
          </p>

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="sakhi-gradient w-full rounded-xl py-3.5 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-rose-600 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;