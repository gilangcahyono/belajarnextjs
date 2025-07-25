import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import * as z from "zod";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const userSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(5),
});

export const GET = async () => {
  const users = await prisma.user.findMany();

  try {
    if (!users) {
      return NextResponse.json(
        {
          ok: false,
          message: "No users found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        data: users,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        message: process.env.APP_ENV ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = userSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    type User = z.infer<typeof userSchema>;

    const payload: User = {
      name: result.data?.name,
      email: result.data.email,
      password: bcrypt.hashSync(result.data.password, salt),
    };

    const user = await prisma.user.create({
      data: payload,
    });

    return NextResponse.json(
      {
        ok: true,
        message: "User created successfully",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        ok: false,
        message: process.env.APP_ENV ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
