import { Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { dateFormatter } from "../utils/TableFormatters"

export type InvoicesTableProps = {
    invoices: {
        id: string;
        date: string;
        dueDate: string;
        total: number;
        clientId: string;
        companyName: string;
        contactName: string;
        contactEmail: string
    }[],
    total: number
}

const invoicesColumns: GridColDef[] = [
    { field: 'companyName', headerName: 'Company', flex: 1 },
    { field: 'total', headerName: 'Total', flex: 1 },
    { field: 'date', headerName: 'Date', valueFormatter: dateFormatter, flex: 1 },
    { field: 'dueDate', headerName: 'DueDate', type: 'date', valueFormatter: dateFormatter, flex: 1 },
];


export const InvoicesTable = (props: InvoicesTableProps) => {
    return (
        <>
            <Typography variant="h5">
                Invoices
            </Typography>

            {props.total === 0 ? <div>No invoices found.</div> : <DataGrid
                autoHeight
                rows={props.invoices}
                columns={invoicesColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnMenu
            />}
        </> 
    )
}