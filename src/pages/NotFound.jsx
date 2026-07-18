import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <h1 className="mb-4 text-7xl font-bold">404</h1>
      <p className="mb-8 max-w-md text-lg text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105 hover:opacity-90"
      >
        Return Home
      </Link>
    </main>
  );
}
