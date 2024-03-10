import Layout from '@/components/common/Layout';
import Header from '@/components/Header';
import Head from 'next/head';

const PageLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>WonWon by Reviv</title>
        <meta
          name="description"
          content="Repair-Lifestyle platform in Thailand"
          key="desc"
        />
        <meta property="og:title" content="WonWon by Reviv" />
        <meta
          property="og:description"
          content="The 1st Repair-Lifestyle platform in Thailand that connects consumers with local repair shops."
        />
        <meta property="og:image" content="/OG.png" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0"
        ></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        <link rel="shortcut icon" href="/favicon.jpg" />
      </Head>
      <Layout header={<Header />}>{children}</Layout>
    </div>
  );
};

export default PageLayout;
