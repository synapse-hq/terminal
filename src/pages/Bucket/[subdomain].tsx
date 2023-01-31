import DashboardSidebar from "../../components/DashboardSidebar";

import BucketView from "../../components/BucketView"
import { useRouter } from 'next/router'
import { useState} from 'react'

export default () => {
  console.log("FROM BUCKET PAGE")
  const router = useRouter()
  const { subdomain } = router.query

  if (!subdomain) {
    return (
      <h1>This bucket does not exists</h1>
    )
  }

  if (Array.isArray(subdomain)) {
    return (
      <h1>Something went wrong</h1>
    )
  }

  return (
    <BucketView subdomain={subdomain}></BucketView>
  )
}