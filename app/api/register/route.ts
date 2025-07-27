import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/user";

const salt = bcrypt.genSaltSync(10);

const userSchema = z
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

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = userSchema.safeParse(body);

    if (!result.success) {
      const formatError = result.error.format();

      return NextResponse.json(
        {
          ok: false,
          message: "Validation error",
          data: null,
          errors: {
            name: formatError.name?._errors?.[0],
            email: formatError.email?._errors?.[0],
            password: formatError.password?._errors?.[0],
            confirmPassword: formatError.confirmPassword?._errors?.[0],
          },
        },
        { status: 400 }
      );
    }

    const payload = {
      name: result.data.name,
      email: result.data.email,
      password: bcrypt.hashSync(result.data.password, salt),
    };

    const existingUser = await getUserByEmail(payload.email);

    if (existingUser) {
      return NextResponse.json(
        { ok: false, message: "User already exists" },
        { status: 409 }
      );
    }

    const createdUser = await prisma.user.create({
      data: payload,
    });

    const user = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };

    return NextResponse.json(
      {
        ok: true,
        message: "User created successfully",
        data: user,
        errors: null,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        ok: false,
        message: "Internal server error",
        data: null,
        errors: null,
      },
      { status: 500 }
    );
  }
};
