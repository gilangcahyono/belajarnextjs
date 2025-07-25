// import { Prisma } from "@/generated/prisma";
// import prisma from "@/lib/prismaClient";
// import { NextResponse } from "next/server";

// interface Params {
//   params: { id: string };
// }

// export const GET = async (request: Request, { params }: Params) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: parseInt(params.id),
//       },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//       },
//     });

//     if (!user) {
//       return NextResponse.json(
//         {
//           ok: false,
//           message: "No users found",
//         },
//         { status: 404 }
//       );
//     }

//     console.log(user);

//     return NextResponse.json(
//       {
//         ok: true,
//         data: user,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//   }
// };
