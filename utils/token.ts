"use server";

import { cookies } from "next/headers";

export const getToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ? token : undefined;
};

export const setToken = async (token: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set("token", token);
};

export const removeToken = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};
