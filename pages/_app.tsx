import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme } from '@mui/material';
import { teal } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';
import { AuthProvider } from '../src/auth/AuthContext';

const theme = createTheme({
  palette: {
    primary: teal,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp
