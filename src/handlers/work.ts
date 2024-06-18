import { del, get, post } from "@/lib/axios";
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

  static async getWorkDetails(id: string) {
    return get(`/work/${id}`);
  }

  static async addActivites(params: {
    workId: string;
    activities: {
      activityRef: string;
      activityDescription: string;
      assignedDates: string[];
    }[];
  }) {
    const { workId, ...rest } = params;
    return post(`/work/add/activities/${workId}`, params, {
      headers: {
        Authorization: `Bearer ${LocalStorage.get("token")}`,
      },
    });
  }

  static async deleteWork(id: string) {
    console.log({ id });
    return del(`/work/${id}`, {
      headers: {
        Authorization: `Bearer ${LocalStorage.get("token")}`,
      },
    });
  }
}
export default Work;
