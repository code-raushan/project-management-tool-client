import { ResponseType } from "@/interfaces/api"
import { toast } from "react-toastify"

export class Interceptor {
    static async handleApi(
        api: () => Promise<ResponseType | string>,
        setLoading?: (loading: boolean) => void,
        onSuccess?: (data: any) => void,
        onError?: () => void
    ) {
        setLoading && setLoading(true)
        try {
            const returnedValue = await api()
            if (typeof returnedValue === 'string') {
                setLoading && setLoading(false)
                toast.error(returnedValue)
                onError && onError()
                return
            }
            const [response, error] = returnedValue
            if (response) {
                onSuccess && onSuccess(response)
            } else if (error) {
                // toast.error(error || 'Something went wrong')
                onError && onError()
            } else {
                onError && onError()
            }
        } catch (error) {
            onError && onError()
        } finally {
            setLoading && setLoading(false)
        }
    }
}