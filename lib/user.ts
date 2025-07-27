import prisma from "@/lib/prismaClient";

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return null;
  return user;
};
