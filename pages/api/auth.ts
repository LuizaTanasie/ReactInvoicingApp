import { BaseAPI, handleGenericErros } from "./base";


export const AuthAPI = {
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

    }
}