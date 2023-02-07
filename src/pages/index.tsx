import React, {useEffect} from "react";
import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import NavigationBar from '../components/NavigationBar'
import Header from '../components/Header'
import Workflow from '../components/Workflow'
import Footer from '../components/Footer'
import Testimonials from '../components/Testimonials'
import Integrations from '../components/Integrations'
import { Divider } from '@chakra-ui/react'

import { useAuth } from "../hooks/use-auth";
import { authIsInitialized } from "../assertions";
import { useRouter } from "next/router";


export default function Home() {
  const auth = useAuth();
  const router = useRouter()

  const isLoggedIn = async() => {
    try {
      authIsInitialized(auth)
      const res = await auth.checkUser()
      if (res.error) {
        return
      }
     router.push(`/dashboard/${res.data}`)
    } catch(err) {
      console.log("ERROR: auth not initialized", err);
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])
  
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
