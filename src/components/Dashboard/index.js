import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Dash from './Dashboard';

const Dashboard = (props) => {
  return (
    <>
      {/* <Create /> */}
      <Dash />
    </>
  );
};

export default withRouter(Dashboard);
