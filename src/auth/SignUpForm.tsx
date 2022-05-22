import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Typography } from "@mui/material";

import { ReactNode, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from '@hookform/resolvers/yup'
import { InferType, object, string, ref } from "yup"

import { useForm } from "react-hook-form"

const schema = object({
    email: string().email("Email is invalid.").required("Email is required."),
    firstName: string().required("First name is required."),
    lastName: string().required("Last name is required."),
    password: string().min(3, "Password must be at least 3 characters long.").required("Password is required."),
    confirmPassword: string().required("Confirm password is required.").oneOf([ref('password')], "Passwords don't match.")
});

export type SignUpFormValues = InferType<typeof schema>

export type SignUpFormProps = {
    onSignUpRequest: (params: SignUpFormValues) => unknown
    genericError?: ReactNode
    disabled?: boolean
}

export const SignUpForm = (props: SignUpFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
        resolver: yupResolver(schema)
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
    const handleClickShowPassword = (isConfirmation: boolean) =>
        isConfirmation ? setShowConfirmationPassword(!showConfirmationPassword) : setShowPassword(!showPassword);

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(props.onSignUpRequest)}>
            <Typography variant="h5">
                Sign up
            </Typography>
            <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel>First name</InputLabel>
                <OutlinedInput
                    disabled={props.disabled}
                    id="first-name"
                    label="First name"
                    type="text"
                    {...register('firstName')}
                />
                <FormHelperText error>
                    {errors.firstName?.message}
                </FormHelperText>
            </FormControl>
            <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput
                    disabled={props.disabled}
                    id="last-name"
                    label="Last name"
                    type="text"
                    {...register('lastName')}
                />
                <FormHelperText error>
                    {errors.lastName?.message}
                </FormHelperText>
            </FormControl>
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
                                onClick={() => handleClickShowPassword(false)}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    } />
                <FormHelperText error>
                    {errors.password?.message}
                </FormHelperText>
            </FormControl>
            <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel>Confirm password</InputLabel>
                <OutlinedInput
                    id="confirm-password"
                    label="Confirm password"
                    disabled={props.disabled}
                    type={showConfirmationPassword ? "text" : "password"}
                    {...register('confirmPassword')}
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
            <FormHelperText error>
                {errors.confirmPassword?.message}
            </FormHelperText>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
        </Box>
    );
}
