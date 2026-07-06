import crypto from "node:crypto";
import { env } from "../../config/env.js";
import { createError } from "../../utils/app-error.js";
import { LoginInput } from "./auth.validator.js";

const signPayload = (payload: string) =>
  crypto.createHmac("sha256", env.AUTH_SECRET).update(payload).digest("base64url");

const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN";
};

const adminUser: AuthUser = {
  id: "admin",
  name: "ERP Besi Admin",
  email: env.ADMIN_EMAIL,
  role: "ADMIN",
};

export const authService = {
  login: (input: LoginInput) => {
    if (input.email !== env.ADMIN_EMAIL || input.password !== env.ADMIN_PASSWORD) {
      throw createError.unauthorized("Email atau password salah");
    }

    const payload = encode({
      sub: adminUser.id,
      email: adminUser.email,
      role: adminUser.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
    });
    const token = `${payload}.${signPayload(payload)}`;

    return {
      user: adminUser,
      token,
    };
  },

  verify: (token?: string): AuthUser => {
    if (!token) throw createError.unauthorized();

    const [payload, signature] = token.split(".");
    if (!payload || !signature || signPayload(payload) !== signature) {
      throw createError.unauthorized("Token tidak valid");
    }

    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp: number;
      email: string;
      role: "ADMIN";
    };

    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      throw createError.unauthorized("Token expired");
    }

    return adminUser;
  },
};
