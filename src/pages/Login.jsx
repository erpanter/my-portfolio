import { useAuth } from "react-oidc-context";

export default function Login() {
  const auth = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black text-white">
      <h1 className="text-4xl font-bold">Admin Portal</h1>
      <p className="text-gray-400">Authorized access only</p>
      <button
        onClick={() => auth.signinRedirect()}
        className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
      >
        Login with Cognito
      </button>
    </main>
  );
}
