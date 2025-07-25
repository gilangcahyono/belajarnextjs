import prisma from "@/lib/prismaClient";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import * as z from "zod";
import jwt from "jsonwebtoken";

const credentialSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(5, "Password must be at least 5 characters"),
});

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = credentialSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, message: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "User not found" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { ok: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET!,
      { algorithm: "HS256", expiresIn: "1d" }
    );

    return NextResponse.json(
      { ok: true, message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        ok: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
