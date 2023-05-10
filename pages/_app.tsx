import '../styles/globals.css';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { AppProps } from 'next/app';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { useRouter } from "next/router";

import { supabase } from "../utility/supabaseClient";
import { store } from "../redux/store";
import Layout from '../components/layout';

interface MyAppProps extends AppProps {
  initialSession: Session;
}

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, pageProps, initialSession, } = props;
  const router = useRouter();
  const currentRoute = router.pathname;
 

  return (
    <Provider store={store}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={initialSession}
      >{currentRoute == "/signin" ? (
          <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 5000,
          }}
        />
      </SessionContextProvider>
    </Provider>
  )
}
export default MyApp
