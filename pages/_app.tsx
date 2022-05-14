import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme } from '@mui/material';
import { teal } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    primary: teal,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}><Component {...pageProps} /></ThemeProvider>
}

export default MyApp
