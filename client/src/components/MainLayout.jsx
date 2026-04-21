import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Menu } from 'lucide-react';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* Sidebar - Remains outside main for consistent positioning */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 min-h-screen ${isSidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[88px]'}`}>
        
        {/* Universal Navbar (Mobile & Desktop) */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-8 max-w-[1500px] w-full mx-auto overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
