import Layout from '/components/common/Layout/Layout';
import '/styles/globals.css'
import NextProgress from "next-progress";
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App({Component, pageProps: { session, ...pageProps }}) {
  return (
    <>
      <SessionProvider session={session}>
        <NextProgress color="#3595F6" delay={300}  height={3} options={{ showSpinner: false }} />
        <ToastContainer  />
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
         
        </Layout>
      </SessionProvider>
    </>
    )
}
