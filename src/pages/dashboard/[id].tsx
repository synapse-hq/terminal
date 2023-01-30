import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import BucketsView from '../../components/BucketsView'
import { type Bucket } from "../../components/types";
import BucketView from "../../components/BucketView";
import axios from "axios"

const VIEWS = {
  buckets: "buckets",
  bucket: "bucket"
};

const domain = "https://terminal.diegohernandezramirez.dev/api"

const Dashboard = () => {
  const [currentView, setCurrentView] = useState(VIEWS.buckets);
  const [buckets, setBuckets] = useState([]);

  const getBuckets = async() => {
    try {
      const buckets = await axios.get(domain + "/buckets")
      console.log("BUCKS", buckets)
      setBuckets(buckets.data)
    } catch (err: any) {
      console.log(err.bucket)
    }
  }

  useEffect(() => {
    getBuckets()
  }, [])
  
  console.log(currentView)
  if (currentView == VIEWS.buckets) {
    return (
      <DashboardSidebar>
        <BucketsView buckets={buckets}></BucketsView>
      </DashboardSidebar>
    )
  } 
  // else if (currentView == VIEWS.bucket) {
  //   return (
  //     <DashboardSidebar>
  //       <BucketView ></BucketView>
  //     </DashboardSidebar>
  //   )
  // }
};

export default Dashboard;
