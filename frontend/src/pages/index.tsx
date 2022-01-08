import Head from 'next/head'
import { Welcome } from '~/components/welcome/Welcome'

const Home: React.FC = () => {
  return (
    <main>
      <Head>
        <title>Skull King Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Welcome />
    </main>
  )
}

export default Home
