import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import NavigationBar from 'src/components/NavigationBar'
import Header from 'src/components/Header'
import Workflow from 'src/components/Workflow'
import Footer from 'src/components/Footer'
import Testimonials from 'src/components/Testimonials'
import Integrations from 'src/components/Integrations'
import { Divider } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <meta name="Terminal" content="Test and inspect webhooks with ease" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavigationBar />
      <Header></Header>
      <Divider borderColor='blackAlpha.900'></Divider>
      <Workflow></Workflow>
      <Integrations />
      <Testimonials></Testimonials>
      <Footer></Footer>
    </>
  )
}
