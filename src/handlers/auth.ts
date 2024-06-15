import { post } from "@/lib/axios";

class Auth {
  static async login(data: { email: string; password: string }) {
    return await post("/user/login", data);
  }

  static async create(data: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    isdCode?: string;
    phoneNumber?: string;
    address?: string;
    role: string;
  }) {
    return await post("/user/create", data);
  }
}

export default Auth;
