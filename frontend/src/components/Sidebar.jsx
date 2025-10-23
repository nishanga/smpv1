import { NavLink, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUserTie, FaUsers, FaSignOutAlt, FaSchool } from 'react-icons/fa';
import {FcRules, FcHome, FcPositiveDynamic, FcTemplate, FcPortraitMode, FcViewDetails  } from 'react-icons/fc'


const Sidebar = ({ collapsed, isMobileOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FcPositiveDynamic /> },
    { path: '/DailyDataEntry', name: 'Daily Data Entry', icon: <FcRules /> },
    { path: '/supplierregister', name: 'Supplier Details', icon: <FcPortraitMode /> },
    { path: '/viewsuppliers', name: 'View Supppliers', icon: <FcViewDetails /> },
    { path: '/reports', name: 'Reports', icon: <FcTemplate /> },
    { path: '/annualform', name: 'Annual Form', icon: <FcTemplate /> }
    
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center p-[22px] border-b border-white/10">
        <div className="flex items-center gap-2">
          <FaSchool className="text-2xl" />
          {!collapsed && <span className="text-xl font-semibold">SMIS</span>}
        </div>
      </div>

      <nav className="flex-1 mt-4 px-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
              }`}
              onClick={onClose}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-1 border-t border-white/10">
        <NavLink
          to="/logout"
          className="flex items-center gap-4 p-[10px] rounded-lg hover:bg-white/10 transition-colors text-red-200"
          onClick={onClose}
        >
          <span className="text-xl">
            <FaSignOutAlt />
          </span>
          {!collapsed && <span>Logout</span>}
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={`hidden md:flex h-screen fixed top-0 left-0 bg-gradient-to-b from-blue-400 to-blue-400 text-white shadow-lg z-40 transition-all duration-300 flex-col ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          ></div>
          <aside className="relative w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white shadow-lg z-50">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
