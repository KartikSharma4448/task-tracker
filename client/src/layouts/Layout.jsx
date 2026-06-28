// Main application layout with header and content area.

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
