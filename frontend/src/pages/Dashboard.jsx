import React, { useState } from 'react';
import CampaignForm from '../components/CampaignForm';
import CampaignList from '../components/CampaignList';

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-8">Email Campaign Manager</h1>
      <CampaignForm onRefresh={triggerRefresh} />
      <CampaignList refresh={refresh} />
    </div>
  );
};

export default Dashboard;
