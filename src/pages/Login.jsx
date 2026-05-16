import { useAuth }
from "react-oidc-context";

export default function Login() {

  const auth = useAuth();

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      flex
      flex-col
      items-center
      justify-center
      gap-6
    ">

      <h1 className="text-4xl font-bold">
        Admin Portal
      </h1>

      <p className="text-gray-400">
        Authorized access only
      </p>

      <button
        onClick={() => auth.signinRedirect()}
        className="
          bg-white
          text-black
          px-6
          py-3
          rounded-xl
          font-semibold
        "
      >
        Login with Cognito
      </button>

    </div>
  );
}