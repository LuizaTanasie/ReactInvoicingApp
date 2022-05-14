import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";
import { useState } from "react";
import NextLink from 'next/link'
import { Link as MUILink } from "@mui/material";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
    const handleClickShowPassword = (isConfirmation: boolean) =>
        isConfirmation ? setShowConfirmationPassword(!showConfirmationPassword) : setShowPassword(!showPassword);

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
                    my: 24,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography variant="h5">
                        Sign up
                    </Typography>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <InputLabel>Name</InputLabel>
                        <OutlinedInput
                            id="name"
                            label="Name"
                            type="text"
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <InputLabel>E-mail</InputLabel>
                        <OutlinedInput
                            id="email"
                            label="E-mail"
                            type="email"
                        />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end" variant="filled">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword(false)}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            } />
                    </FormControl>
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <InputLabel>Confirm password</InputLabel>
                        <OutlinedInput
                            id="confirm-password"
                            label="Confirm password"
                            type={showConfirmationPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end" variant="filled">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword(true)}
                                    >
                                        {showConfirmationPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            } />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>

                    <Box>
                        Already have an account?
                        <NextLink href="/login" passHref>
                            <MUILink sx={{ ml: 1 }}>Sign in</MUILink>
                        </NextLink>
                    </Box>
                </Box>
            </Grid>
        </Grid>

    );
}