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

type State = {
  error: string | null;
  values: { email: string; password: string };
};

type Body = {
  email: string;
  password: string;
};

export const login = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const body: Body = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
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

    if (!res.ok) {
      throw new Error(data.message);
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
      error: null,
      values: {
        email: "",
        password: "",
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      error: error.message,
      values: {
        email: body.email,
        password: body.password,
      },
    };
    // const message =
    //   error instanceof Error ? error.message : "Internal server error";
    // return {
    //   message: {
    //     error: message,
    //     values: {
    //       email: body.email,
    //       password: body.password,
    //     },
    //   },
    // };
  }
};
