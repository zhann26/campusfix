
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const [name, setName] = useState("CampusFix User");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function checkUser() {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/login");
        return;
      }

      setEmail(data.user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", data.user.id)
        .single();

      if (profile?.full_name) {
        setName(profile.full_name);
      }

      setLoading(false);
    }

    checkUser();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Unable to log out. Please try again.");
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-900">
        <p>Loading your dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold text-blue-700">
            CampusFix
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-100"
          >
            Log Out
          </button>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-10">
          <p className="text-sm font-semibold text-blue-700">
            USER DASHBOARD
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Welcome, {name}!
          </h1>

          <p className="mt-2 text-gray-600">
            {email}
          </p>

          <p className="mt-4 text-gray-600">
            Manage and monitor your campus maintenance concerns.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Total Requests", value: "0" },
            { title: "Pending Requests", value: "0" },
            { title: "Resolved Requests", value: "0" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm"
            >
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="mt-3 text-4xl font-bold">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold">Report an Issue</h2>

            <p className="mt-3 text-gray-600">
              Submit a maintenance request for damaged facilities,
              equipment, or classroom concerns.
            </p>

            <span className="mt-6 inline-block rounded-lg bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-500">
              Coming Soon
            </span>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold">My Requests</h2>

            <p className="mt-3 text-gray-600">
              View submitted requests and track their maintenance status.
            </p>

            <span className="mt-6 inline-block rounded-lg bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-500">
              Coming Soon
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
