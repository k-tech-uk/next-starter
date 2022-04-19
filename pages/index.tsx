import type { NextPage } from 'next';

// Components
import Layout from '../layouts/default';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="prose max-w-none">
        <h1>Welcome to the Next.js Starter Kit</h1>
        <p>Start adding some components and let's get coding!</p>
      </div>
    </Layout>
  );
};

export default Home;
