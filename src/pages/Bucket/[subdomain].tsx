import React from "react";
import DashboardSidebar from "../../components/DashboardSidebar";

import BucketView from "../../components/BucketView"
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()
  const { subdomain } = router.query


  if (!subdomain) {
    return (
      <h1>Loading Bucket...</h1>
    )
  }

  if (Array.isArray(subdomain)) {
    return (
      <h1>Something went wrong</h1>
    )
  }

  return (
    <DashboardSidebar>
        <BucketView subdomain={subdomain}></BucketView>
    </DashboardSidebar>
  )
}