import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import BucketsView from '../../components/BucketsView'

const VIEWS = {
  buckets: "buckets",
};

const Dashboard = () => {
  const [currentView, setCurrentView] = useState(VIEWS.buckets);
  const [buckets, setBuckets] = useState([]);

  if (currentView == VIEWS.buckets) {
    return (
      <DashboardSidebar>
        <BucketsView buckets={buckets}></BucketsView>
      </DashboardSidebar>
    )
  }
};

export default Dashboard;
