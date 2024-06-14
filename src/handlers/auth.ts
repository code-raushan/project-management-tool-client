import { post } from "@/lib/axios";

class Auth {
    static async login(data: { email: string, password: string }) {
        console.log({ data })
        return await post("/user/login", data);
    }
}

export default Auth;