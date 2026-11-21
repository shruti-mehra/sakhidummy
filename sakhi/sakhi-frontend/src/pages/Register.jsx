import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

import { ShieldCheck, User, Mail, Phone, Lock } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
   confirmPassword: "",
    
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

    if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    if (form.password.length < 6) {
        setError("Password must contain at least 6 characters.");
        return;
    }

    setLoading(true);

    try {

        await registerUser({
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            
        });

        navigate("/login");

    } catch (error) {

        console.error("Registration error:", error);

        setError(
            error.message ||
            "Registration failed. Please try again."
        );

    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 px-5 py-10">
      <div className="mx-auto max-w-md">
        <div className="mb-7 text-center">
          <div className="sakhi-gradient mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md">
            <ShieldCheck size={30} />
          </div>

          <h1 className="mt-3 text-3xl font-black text-rose-700">
            Join SAKHI
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create your safety account
          </p>
        </div>

        <div className="rounded-3xl border border-rose-100 bg-white p-7 shadow-xl">
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={User}
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />

            <Input
              icon={Mail}
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <Input
              icon={Phone}
              label="Phone Number"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

            <Input
              icon={Lock}
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create password"
            />

            <Input
              icon={Lock}
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />

            <button
              disabled={loading}
              className="sakhi-gradient mt-3 w-full rounded-xl py-3.5 font-semibold text-white shadow-md hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-rose-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Input({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <Icon
          size={18}
          className="absolute left-3 top-3.5 text-gray-400"
        />

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
        />
      </div>
    </div>
  );
}

export default Register;