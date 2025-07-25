import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { Prisma } from "@/generated/prisma";
import jwt from "jsonwebtoken";

export const GET = async (request: NextRequest) => {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized - No token" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const secretKey: string | undefined = process.env.JWT_SECRET;
    if (!secretKey) throw new Error("JWT secret is not defined");

    const decoded = jwt.verify(token, secretKey);
    if (!decoded) {
      return NextResponse.json(
        { ok: false, message: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

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
  } catch (error) {
    console.error(error);
    if (
      error instanceof Error ||
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
      return NextResponse.json(
        {
          ok: false,
          message: process.env.APP_ENV
            ? error.message
            : "Internal Server Error",
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          ok: false,
          message: "Unexpected error occurred",
        },
        { status: 500 }
      );
    }
  }
};
