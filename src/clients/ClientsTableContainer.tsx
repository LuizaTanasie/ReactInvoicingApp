import { Alert, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { ErrorTypes } from "../../pages/api/base";
import { ClientsAPI } from "../../pages/api/clients";
import { ActionState, useAsync } from "../utils/useAsync";
import { ClientsTable } from "./ClientsTable";

export const ClientsTableContainer = () => {
    const { execute, value, status, error } = useAsync(
        ClientsAPI.getClients
    );

    useEffect(() => {
        execute(undefined)
    }, [])

    if (status === ActionState.PENDING) {
        return <CircularProgress />
    }

    if (status === ActionState.ERROR) {
        return <>
            {error === ErrorTypes.UNAUTHORIZED
                ? (
                    <Alert severity="error">You are not authorized to see this resource.</Alert>
                )
                : null}

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
            <ClientsTable clients={value.results} total={value.total}/>
        </>
    )
}