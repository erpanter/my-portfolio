import { Link } from "react-router-dom";

export default function NotFound() {

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      flex
      flex-col
      items-center
      justify-center
      px-6
      text-center
    ">

      <h1 className="
        text-7xl
        font-bold
        mb-4
      ">
        404
      </h1>

      <p className="
        text-gray-400
        text-lg
        mb-8
        max-w-md
      ">
        The page you're looking for
        doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="
          bg-white
          text-black
          px-6
          py-3
          rounded-xl
          font-semibold
          hover:scale-105
          hover:opacity-90
          transition
        "
      >
        Return Home
      </Link>

    </div>
  );
}