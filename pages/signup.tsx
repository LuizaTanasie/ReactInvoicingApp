import { Alert, Box, Grid, Paper } from "@mui/material";

import NextLink from 'next/link'
import { Link as MUILink } from "@mui/material";
import { SignUpForm } from "../src/auth/SignUpForm";
import { AuthAPI } from "../src/api/auth";
import { ErrorTypes } from "../src/api/base";
import { ActionState, useAsync } from "../src/utils/useAsync"
import { NonAuthGuard } from "../src/auth/NonAuthGuard";

export default function SignUp() {
    const { status, execute, error } = useAsync(AuthAPI.signUp)

    return (
        <NonAuthGuard>
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
                        my: 24,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <SignUpForm
                            disabled={status === ActionState.PENDING}
                            genericError={
                                <>
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
                            onSignUpRequest={execute}
                        />

                        <Box>
                            Already have an account?
                            <NextLink href="/login" passHref>
                                <MUILink sx={{ ml: 1 }}>Sign in</MUILink>
                            </NextLink>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </NonAuthGuard>
    );
}