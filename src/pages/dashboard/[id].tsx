import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import BucketsView from '../../components/BucketsView'
import { type Bucket } from "../../components/types";
import BucketView from "../../components/BucketView";

const VIEWS = {
  buckets: "buckets",
  bucket: "bucket"
};

const Dashboard = () => {
  const [currentView, setCurrentView] = useState(VIEWS.buckets);
  const [buckets, setBuckets] = useState([{ name: 'requestbin1', owner: 'yusuf', updatedAt: new Date().toDateString(), events: []}]);

  if (currentView == VIEWS.buckets) {
    return (
      <DashboardSidebar>
        <BucketsView buckets={buckets}></BucketsView>
      </DashboardSidebar>
    )
  } else if (currentView == VIEWS.bucket) {
    return (
      <DashboardSidebar>
        <BucketView bucket={buckets[0]}></BucketView>
      </DashboardSidebar>
    )
  }
};

export default Dashboard;
