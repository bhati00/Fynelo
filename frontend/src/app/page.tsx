// app/page.tsx
"use client"; // needed for onClick

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleLogin = () => {
    // Here you’d normally trigger login logic
    // e.g., set token in cookies, call API, etc.
    document.cookie = "auth_token=demo123; path=/;";
    router.push("/dashboard"); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-6">
      <h1 className="text-3xl font-bold">Welcome to My App</h1>
      <p className="text-gray-600">Please log in to continue</p>
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Log In
      </button>
    </div>
  );
}
