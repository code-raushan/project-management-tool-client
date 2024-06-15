import { ResponseType } from "@/interfaces/api";

export class Interceptor {
  static async handleApi(
    api: () => Promise<ResponseType | string>,
    setLoading?: (loading: boolean) => void,
    onSuccess?: (data: any) => void,
    onError?: () => void,
    showToast?: (message: string) => void
  ) {
    setLoading && setLoading(true);
    try {
      const returnedValue = await api();
      if (typeof returnedValue === "string") {
        setLoading && setLoading(false);
        onError && onError();
        return;
      }
      const [response, error] = returnedValue;
      if (response) {
        onSuccess && onSuccess(response);
      } else if (error) {
        showToast && showToast(error || "Something went wrong");
        onError && onError();
      } else {
        onError && onError();
      }
    } catch (error) {
      showToast && showToast("Something went wrong");
      onError && onError();
    } finally {
      setLoading && setLoading(false);
    }
  }
}
