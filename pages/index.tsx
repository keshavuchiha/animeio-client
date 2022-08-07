import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import { baseUrl } from '../constants/constants'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Animeio</title>
        <meta name="description" content="Best Site to view anime, movies and tv shows" />
      </Head>
    <Layout>
      Index Page
      {baseUrl}
    </Layout>
     

      
    </div>
  )
}

export default Home
