import React from 'react';
import Dashboard from 'layouts/Dashboard/Dashboard';
import { menus } from './constant';

const AdminPanel = () => {
  return <Dashboard menus={menus}>Admin Panel</Dashboard>;
};

AdminPanel.propTypes = {};

AdminPanel.defaultProps = {};

export default AdminPanel;
