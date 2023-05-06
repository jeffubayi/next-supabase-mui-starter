import '../styles/globals.css';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { AppProps } from 'next/app'
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import createEmotionCache from '../utility/createEmotionCache';
import { Toaster } from "react-hot-toast";
import { supabase } from "../utility/supabaseClient";
import  theme  from "../styles/theme";
import { store } from "../redux/store";
import { Provider } from "react-redux";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  initialSession: Session;
}

const clientSideEmotionCache = createEmotionCache();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, initialSession, } = props;

  return (
    <Provider store={store}>
    <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000,
            }}
          />
        </ThemeProvider>
      </CacheProvider>
    </SessionContextProvider>
    </Provider>
  )
}
export default MyApp
