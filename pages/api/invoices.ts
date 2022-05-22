import { BaseAPI, GenericListApiResponse, handleGenericErros } from "./base";

export type InvoiceListApiResponse = GenericListApiResponse<InvoiceDTO>

export type InvoiceDTO = {
    clientId: string;
    companyName: string;
    contactEmail: string;
    contactName: string;
    date: string;
    dueDate: string;
    id: string;
    total: number;
}

export const InvoicesAPI = {
    async getInvoices() {
        try {
            const axiosResponse = await BaseAPI.get<InvoiceListApiResponse>('/invoices')

            return axiosResponse.data;

        } catch (err) {
            return handleGenericErros(err);
        }

    }
}
