import { BaseAPI, GenericListApiResponse, handleGenericErros } from "./base";

export type ClientDTO = {
    address: string;
    contactEmail: string;
    contactName: string;
    iban: string;
    id: string;
    invoiceCount: number;
    name: string;
    taxCode: string;
    totalBilled: number;
    userId: string;
}

export type ClientListApiResponse = GenericListApiResponse<ClientDTO>


export const ClientsAPI = {
    async getClients() {
        try {
            const axiosResponse = await BaseAPI.get<ClientListApiResponse>('/clients')
            //await new Promise((resolve) => setTimeout(resolve, 2000));
            return axiosResponse.data;

        } catch (err) {
            return handleGenericErros(err);
        }


        
    }
}
