"use client";

import Link from "next/link";
import { setToken } from "@/utils/token";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

const loginUserSchema = z.object({
  username: z
    .string("Username must be a string")
    .nonempty("Username is required"),
  password: z
    .string("Password must be a string")
    .nonempty("Password is required")
    .min(5, "Password must be at least 5 characters"),
});

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = new FormData(event.currentTarget);
    const username = body.get("username");
    const password = body.get("password");
    setError("");

    const result = loginUserSchema.safeParse({
      username,
      password,
    });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await setToken(data.accessToken);
      router.push("/login/dummyjson/current");
    } catch (error) {
      console.log(error);
      const message = (error as Error).message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-6">
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        {error && <div className="text-red-600 text-center">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium"> Username </label>
            <input
              name="username"
              readOnly={loading}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium"> Password </label>
            <input
              name="password"
              readOnly={loading}
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
        <p className="text-center">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="font-medium text-red-600 hover:text-red-500"
          >
            {" "}
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Page;
