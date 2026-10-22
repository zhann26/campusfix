
"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "student",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");

  
async function handleRegister(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();
  setError("");
  setSuccess("");

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (form.password.length < 8) {
    setError("Password must contain at least 8 characters.");
    return;
  }

  setLoading(true);

  try {
    const supabase = createClient();

    const { data, error: signUpError } =
      await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            full_name: form.fullName.trim(),
            role: form.role,
          },
          emailRedirectTo:
            `${window.location.origin}/login`,
        },
      });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.user) {
      setSuccess(
        data.session
          ? "Account created successfully!"
          : "Registration submitted! Check your email to confirm your account."
      );
    }
  } catch {
    setError(
      "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
}


  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-bold text-blue-700">
            CampusFix
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Create an Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join CampusFix to report and track campus maintenance issues.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-medium text-gray-700">
              User Role
            </label>
            <select
              id="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            <p className="mt-2 text-xs text-gray-500">
              Maintenance staff and administrator accounts are assigned by authorized administrators.
            </p>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
          
{success && (
  <p
    role="status"
    className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
  >
    {success}
  </p>
)}

<button
  type="submit"
  disabled={loading}
  className="w-full rounded-lg bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Creating Account..." : "Create Account"}
</button>

        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-blue-700 hover:underline">
            Sign In
          </Link>
        </p>

        <p className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-700">
            ← Back to Homepage
          </Link>
        </p>
      </div>
    </main>
  );
}
