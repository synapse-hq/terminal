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

const Dashboard = () => {
  const [currentView, setCurrentView] = useState(VIEWS.buckets);

  if (currentView == VIEWS.buckets) {
    return (
      <DashboardSidebar>
        <BucketsView></BucketsView>
      </DashboardSidebar>
    )
  } 
};

export default Dashboard;
