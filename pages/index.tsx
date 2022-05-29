import * as React from 'react';
import { Button, Grid } from '@mui/material';
import { ClientsTableContainer } from '../src/clients/ClientsTableContainer';
import { InvoicesTableContainer } from '../src/invoices/InvoicesTableContainer';
import { AuthGuard } from '../src/auth/AuthGuard';
import { useAuthContext } from '../src/auth/AuthContext';

export default function Dashboard() {
  const authCtx = useAuthContext();

  return (
    <div>
      <AuthGuard>
        <Button onClick={() => authCtx.logout()}>Log out</Button>
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
      </AuthGuard>
    </div>
  );
}