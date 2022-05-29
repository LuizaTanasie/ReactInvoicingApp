import axios, { AxiosError } from "axios";

export const BaseAPI = axios.create({
    baseURL: 'http://localhost:3001'
});

export const handleGenericErros = (err: AxiosError | any) => {
    if (err instanceof AxiosError) {

        if (err.message === 'Network Error') {
            return Promise.reject(ErrorTypes.CONN_REFUSED)
        }
    }
    return Promise.reject(ErrorTypes.OTHER);
}

export const enum ErrorTypes {
    UNAUTHORIZED = "unauthorized",
    BAD_REQUEST = "bad_request",
    CONN_REFUSED = "conn_refused",
    OTHER = "other",
}

export type GenericListApiResponse<DTO> = {
    skip: number,
    total: number,
    limit: number,
    results: DTO[]
}
