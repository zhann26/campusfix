
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold tracking-tight">
            CampusFix
          </h1>

          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#features" className="hover:text-blue-700">
              Features
            </a>
            <Link
              href="/login"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-white hover:bg-blue-800"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="mb-4 font-semibold text-blue-700">
          SMART CAMPUS MAINTENANCE
        </p>

        <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Report. Track. Resolve.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          A web-based school facility maintenance request and tracking
          system with Generative AI assistance. Report facility issues,
          monitor progress, and help create a safer learning environment.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-blue-700 px-7 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Report an Issue
          </Link>

          <a
            href="#features"
            className="rounded-lg border border-gray-300 bg-white px-7 py-3 font-semibold hover:bg-gray-100"
          >
            Explore Features
          </a>
        </div>
      </section>

      <section id="features" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold">
            What CampusFix Offers
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Report Issues",
                description:
                  "Submit maintenance concerns with descriptions and photos.",
              },
              {
                title: "Track Requests",
                description:
                  "Monitor the progress of submitted maintenance requests.",
              },
              {
                title: "AI Assistance",
                description:
                  "Get AI-assisted issue categorization and summaries.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-200 p-8 shadow-sm"
              >
                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-gray-50 px-6 py-8 text-center text-sm text-gray-500">
        © 2026 CampusFix. IT415 Application Development Project.
      </footer>
    </main>
  );
}
