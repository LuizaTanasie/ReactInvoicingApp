import { AxiosError } from "axios";
import { BaseAPI, handleGenericErros } from "./base";


export const AuthAPI = {
    reqCallbackNumber: NaN,
    resCallbackNumber: NaN,

    async login(params: { email: string, password: string }) {

        try {
            const axiosResponse = await BaseAPI.post<{ access_token: string }>('/auth/login', {
                username: params.email,
                password: params.password
            })

            return axiosResponse.data;
        } catch (err) {
            return handleGenericErros(err);
        }

    },

    async signUp(params: { email: string, password: string }) {

        try {
            const axiosResponse = await BaseAPI.post<{ access_token: string }>('/auth/sign-up', {
                email: params.email,
                firstName: params.email,
                lastName: params.email,
                password: params.password
            })

            return axiosResponse.data;
        } catch (err) {
            return handleGenericErros(err);
        }
    },

    setAuthToken(token: string | null, handleInvalidToken?: () => unknown) {
        BaseAPI.interceptors.request.eject(this.reqCallbackNumber)
        BaseAPI.interceptors.response.eject(this.resCallbackNumber)
        if (token === null) {
            return;
        }

        this.reqCallbackNumber = BaseAPI.interceptors.request.use((req) => {
            req.headers = {
                ...req.headers,
                'Authorization': `Bearer ${token}`
            }

            return req;
        })

        this.resCallbackNumber = BaseAPI.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    handleInvalidToken?.()
                    return;
                }
            }
            return Promise.reject(error)
        })
    },
}