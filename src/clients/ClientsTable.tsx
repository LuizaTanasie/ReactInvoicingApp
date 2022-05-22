import { Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

export type ClientsTableProps = {
    clients: {
        id: string;
        name: string;
        contactName: string;
        contactEmail: string;
        taxCode: string;
        iban: string;
        address: string;
        userId: string;
        totalBilled: number;
        invoiceCount: number;
    }[],
    total: number;
}

const clientsColumns: GridColDef[] = [
    { field: 'name', headerName: 'Company', flex: 1 },
    { field: 'contactName', headerName: 'Contact person', flex: 1 },
    { field: 'contactEmail', headerName: 'Email', flex: 1 },
    { field: 'totalBilled', headerName: 'Total billed', flex: 1 },
    { field: 'invoiceCount', headerName: 'Invoice count', flex: 1 },
];


export const ClientsTable = (props: ClientsTableProps) => {
    return (
        <>
            <Typography variant="h5">
                Clients
            </Typography>
            {props.total === 0 ? <div>No clients found.</div> : <DataGrid
                autoHeight
                rows={props.clients}
                columns={clientsColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnMenu
            />
            }
        </>
    )
}