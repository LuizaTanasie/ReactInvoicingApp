import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";

import { ReactNode, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from '@hookform/resolvers/yup'
import { InferType, object, string } from "yup"
import { useForm } from "react-hook-form"

const schema = object({
    email: string().email("Email is invalid.").required("Email is required."),
    password: string().min(3, "Password must be at least 3 characters long.").required("Password is required.")
});

export type LoginFormValues = InferType<typeof schema>

export type LoginFormProps = {
    onLoginRequest: (params: LoginFormValues) => unknown
    genericError?: ReactNode
    disabled?: boolean
}

export const LoginForm = (props: LoginFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: yupResolver(schema)
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (

        <Box component="form" noValidate onSubmit={handleSubmit(props.onLoginRequest)}>
            <Typography variant="h5">
                Sign in
            </Typography>
            <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel>E-mail</InputLabel>
                <OutlinedInput
                    disabled={props.disabled}
                    id="email"
                    label="E-mail"
                    type="email"
                    {...register('email')}
                />
                <FormHelperText error>
                    {errors.email?.message}
                </FormHelperText>
            </FormControl>
            <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    id="password"
                    label="Password"
                    disabled={props.disabled}
                    type={showPassword ? "text" : "password"}
                    {...register('password')}
                    endAdornment={
                        <InputAdornment position="end" variant="filled">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    } />
                <FormHelperText error>
                    {errors.password?.message}
                </FormHelperText>
            </FormControl>
            {props.genericError}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={props.disabled}
                sx={{ mt: 3, mb: 2 }}
            >
                Sign In
            </Button>
        </Box>

    );
}