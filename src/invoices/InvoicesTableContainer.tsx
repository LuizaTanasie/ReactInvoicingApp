import { Alert, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { ErrorTypes } from "../api/base";
import { InvoicesAPI } from "../api/invoices";
import { ActionState, useAsync } from "../utils/useAsync";
import { InvoicesTable } from "./InvociesTable";

export const InvoicesTableContainer = () => {
    const { execute, value, status, error } = useAsync(
        InvoicesAPI.getInvoices
    );

    useEffect(() => {
        execute(undefined)
    }, [])

    if (status === ActionState.PENDING) {
        return <CircularProgress />
    }

    if (status === ActionState.ERROR) {
        return <>
            {
                error === ErrorTypes.CONN_REFUSED
                    ? (
                        <Alert severity="error">We are having trouble reaching the server.</Alert>
                    )
                    : null
            }
            {
                error === ErrorTypes.OTHER
                    ? (
                        <Alert severity="error">Clients could not be loaded.</Alert>
                    )
                    : null
            }
        </>
    }

    if (!value) {
        return null;
    }

    return (
        <>
            <InvoicesTable invoices={value.results} total={value.total} />
        </>
    )
}