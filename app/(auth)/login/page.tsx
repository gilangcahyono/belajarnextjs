"use client";

import { login } from "@/actions/login";
import Link from "next/link";
import { useActionState } from "react";

const Page = () => {
  const [state, formAction, pending] = useActionState(login, null);

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
        {state && <div className="text-red-600 text-center">{state}</div>}
        <form action={formAction} className="space-y-5">
          <div>
            <label className="font-medium"> Email </label>
            <input
              // type="email"
              // required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
              name="email"
              readOnly={pending}
              // defaultValue={state.}
            />
          </div>
          <div>
            <label className="font-medium"> Password </label>
            <input
              type="password"
              // required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
              name="password"
              readOnly={pending}
              // defaultValue={state.values.password}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150 disabled:cursor-not-allowed disabled:opacity-55"
            disabled={pending}
          >
            {pending ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="text-center">
          Don&apos;t have an account?
          <Link
            href="/register"
            className="font-medium text-red-600 hover:text-red-500"
          >
            {" "}
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Page;
