import axios, { AxiosError } from "axios";

export const BaseAPI = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYS51c2VyQHRlc3QuY29tIiwiaWQiOiIxODQ0YTViNS0yMzYwLTRjMjctOGEwYy0xYWFjMWZhOTIyZWUiLCJpYXQiOjE2NTMyMTI4MTMsImV4cCI6MTY1MzIxNjQxM30.2UQPZNSJvyvQabKApzgmGkEbnqiM9Pk2uIt9GmIFb0k`
    }
});

export const handleGenericErros = (err: AxiosError | any) => {
    if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
            return Promise.reject(ErrorTypes.UNAUTHORIZED)
        }

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
