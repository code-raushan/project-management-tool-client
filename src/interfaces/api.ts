export interface SuccessResponse<T = any> {
    certificates(certificates: any): unknown
    status: number
    message: string
    success: boolean
    data: T
}

export type ResponseType = [SuccessResponse | undefined, string | undefined]