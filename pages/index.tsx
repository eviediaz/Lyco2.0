import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from "../pages/dashboard/dashboard";
import Header from "../pages/components/Header";
import SideMenu from "../pages/components/SideMenu";
import Data from "../pages/dashboard/data";

export default function Home() {
  return (
    <>
      <Head>
        <title>Data dashboard</title>
        <meta name="description" content="Data dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header/>
        <SideMenu/>
        <Dashboard/>
        <Data/>
      </main>
    </>
  )
}
