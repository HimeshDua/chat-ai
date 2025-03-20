// src/lib/auth.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

export const getAuthSession = () => getServerSession(authOptions);
