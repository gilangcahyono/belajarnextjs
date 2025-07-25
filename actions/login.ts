"use server";

import { cookies } from "next/headers";
// import * as z from "zod";

// const credentialSchema = z.object({
//   email: z.string().nonempty("Email is required").email("Invalid email"),
//   password: z
//     .string()
//     .nonempty("Password is required")
//     .min(5, "Password must be at least 5 characters"),
// });

export const login = async (prevState: any, formData: FormData) => {
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    // const result = credentialSchema.safeParse(body);

    // if (!result.success) {
    //   return {
    //     message: "Invalid email",
    //     values: {
    //       email: body.email,
    //       password: body.password,
    //     },
    //   };
    // }

    const res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!data.ok) {
      return new Error(data.message);
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: "token",
      value: data.token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return {
      message: {
        error: data.message,
        values: {
          email: body.email,
          password: body.password,
        },
      },
    };
  } catch (error) {
    console.log(error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return {
      message: {
        error: message,
        values: {
          email: body.email,
          password: body.password,
        },
      },
    };
  }
};
