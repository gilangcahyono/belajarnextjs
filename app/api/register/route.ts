import { NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma";

const salt = bcrypt.genSaltSync(10);

const userSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(5),
});

type User = z.infer<typeof userSchema>;

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

    const payload: User = {
      name: result.data?.name,
      email: result.data.email,
      password: bcrypt.hashSync(result.data.password, salt),
    };

    const user = await prisma.user.create({
      data: payload,
    });

    const userRes = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(
      {
        ok: true,
        message: "User created successfully",
        data: userRes,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            ok: false,
            message: "User already exists",
          },
          { status: 409 }
        );
      }

      return NextResponse.json(
        {
          ok: false,
          message: process.env.APP_ENV
            ? error.message
            : "Internal Server Error",
        },
        { status: 500 }
      );
    }
  }
};
