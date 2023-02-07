import React from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import BucketsView from '../../components/BucketsView'

const Dashboard = () => {
  return (
    <DashboardSidebar>
      <BucketsView></BucketsView>
    </DashboardSidebar>
  )
};

export default Dashboard;
