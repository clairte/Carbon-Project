import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Temp from './TemplateList';

const TemplateList = (props) => {
  return (
    <>
      {/* <Create /> */}
      <Temp />
    </>
  );
};

export default withRouter(TemplateList);