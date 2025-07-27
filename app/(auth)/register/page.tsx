"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";

const registerUserSchema = z
  .object({
    name: z
      .string("Name must be a string")
      .nonempty("Name is required")
      .max(50, "Name must be at most 50 characters"),
    email: z.string().nonempty("Email is required").email("Invalid email"),
    password: z
      .string("Password must be a string")
      .nonempty("Password is required")
      .min(5, "Password must be at least 5 characters"),
    confirmPassword: z
      .string("Confirm Password must be a string")
      .nonempty("Confirm Password is required")
      .min(5, "Confirm Password must be at least 5 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const Page = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors | null>();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setFieldErrors(null);

    const result = registerUserSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const formatError = result.error.format();
      setFieldErrors({
        name: formatError.name?._errors?.[0],
        email: formatError.email?._errors?.[0],
        password: formatError.password?._errors?.[0],
        confirmPassword: formatError.confirmPassword?._errors?.[0],
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess(true);
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setError(error.message);
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
              Register your account
            </h3>
          </div>
        </div>

        {error && <div className="text-red-600 text-center">{error}</div>}
        {success && (
          <div className="text-red-600 text-center">
            User created successfully
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="font-medium"> Name </label>
            <input
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
              type="text"
              required
              readOnly={loading}
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {fieldErrors?.name && (
              <small className="text-red-600">{fieldErrors.name}</small>
            )}
          </div>
          <div>
            <label className="font-medium"> Email </label>
            <input
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
              type="email"
              required
              readOnly={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {fieldErrors?.email && (
              <small className="text-red-600">{fieldErrors.email}</small>
            )}
          </div>
          <div>
            <label className="font-medium"> Password </label>
            <input
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
              type="password"
              required
              readOnly={loading}
              value={password}
              minLength={5}
              onChange={(e) => setPassword(e.target.value)}
            />
            {fieldErrors?.password && (
              <small className="text-red-600">{fieldErrors.password}</small>
            )}
          </div>
          <div>
            <label className="font-medium"> Confirm Password </label>
            <input
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
              type="password"
              required
              readOnly={loading}
              value={confirmPassword}
              minLength={5}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {fieldErrors?.confirmPassword && (
              <small className="text-red-600">
                {fieldErrors.confirmPassword}
              </small>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
        <p className="text-center">
          Already have an account?
          <Link
            href="/login"
            className="font-medium text-red-600 hover:text-red-500"
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Page;
