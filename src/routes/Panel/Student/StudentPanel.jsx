import React from 'react';
import Dashboard from 'layouts/Dashboard';
import { menus, quickLinks } from './constant';

const StudentPanel = () => {
  return (
    <Dashboard quickLinks={quickLinks} menus={menus}>
      Student Panel
    </Dashboard>
  );
};

StudentPanel.propTypes = {};

StudentPanel.defaultProps = {};

export default StudentPanel;
