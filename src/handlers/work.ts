import { get, post } from "@/lib/axios";
import { LocalStorage } from "@/lib/localStorage";

class Work {
  static async create(data: {
    title: string;
    startDate: string;
    endDate: string;
  }) {
    return post("/work", data, {
      headers: {
        Authorization: `Bearer ${LocalStorage.get("token")}`,
      },
    });
  }

  static async listWorks() {
    return get("/work", {
      headers: {
        Authorization: `Bearer ${LocalStorage.get("token")}`,
      },
    });
  }
}
export default Work;
