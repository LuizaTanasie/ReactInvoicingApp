import { Alert, Box, Grid, Paper } from "@mui/material"
import { LoginForm } from "../src/auth/LoginForm"
import { ActionState, useAsync } from "../src/utils/useAsync"
import NextLink from 'next/link'
import { Link as MUILink } from "@mui/material";
import { AuthAPI } from "./api/auth";
import { ErrorTypes } from "./api/base";

export default function Login() {
    const { status, execute, error } = useAsync(AuthAPI.login)

    return (
        <Grid container sx={{ height: '100vh', backgroundColor: "#F4F9FA" }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={8}
                sx={{
                    backgroundImage: 'url(/images/invoicing.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
                <Box sx={{
                    my: 30,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <LoginForm
                        disabled={status === ActionState.PENDING}
                        genericError={
                            <>
                                {error === ErrorTypes.UNAUTHORIZED
                                    ? (
                                        <Alert severity="error">Invalid login credentials.</Alert>
                                    )
                                    : null}
                                {error === ErrorTypes.CONN_REFUSED
                                    ? (
                                        <Alert severity="error">We are having trouble reaching the server.</Alert>
                                    )
                                    : null}
                                 {error === ErrorTypes.OTHER
                                    ? (
                                        <Alert severity="error">Something went wrong.</Alert>
                                    )
                                    : null}
                            </>
                        }
                        onLoginRequest={execute}
                    />
                    
                    <Box>
                        Don't have an account?
                        <NextLink href="/signup" passHref>
                            <MUILink sx={{ ml: 1 }}>Sign up</MUILink>
                        </NextLink>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}