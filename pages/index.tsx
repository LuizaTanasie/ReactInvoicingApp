import * as React from 'react';
import { Grid } from '@mui/material';
import { ClientsTableContainer } from '../src/clients/ClientsTableContainer';
import { InvoicesTableContainer } from '../src/invoices/InvoicesTableContainer';

export default function Dashboard() {
  return (
    <div>
      <Grid container sx={{ p: 4 }}>
        <Grid item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          sx={{ pr: 3 }}
        >
          <ClientsTableContainer />

        </Grid>
        <Grid item
          xs={12}
          sm={12}
          md={12}
          lg={6}>

          <InvoicesTableContainer />

        </Grid>
      </Grid>
    </div>
  );
}