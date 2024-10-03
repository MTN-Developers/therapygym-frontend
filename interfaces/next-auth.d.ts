// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { User as CustomUser } from "@/interfaces"; // Import your custom User interface

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: CustomUser & DefaultSession["user"];
  }

  interface User extends DefaultUser, CustomUser {}
}
