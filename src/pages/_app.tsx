import { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from '@/app/shared';
import { Meta } from '@/app/shared/meta';
import { ApolloProvider } from '@apollo/client';

import 'react-toastify/dist/ReactToastify.css';
import '@/app/styles/globals.css';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { apolloClient } from '../../lib/apollo';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Atlassian | Start page</title>
        <Meta />
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Container>
            <Component {...pageProps} />
          </Container>
        </Layout>
      </ApolloProvider>
      <ToastContainer />
    </>
  );
};

export default App;
