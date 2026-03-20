import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Flame, Settings, LogOut } from 'lucide-react';
import { useEffect } from 'react';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/streak', label: 'Streak', icon: Flame },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-200">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 transition-colors duration-200">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Flame className="text-orange-500" />
            LC Streak
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 font-medium'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-safe md:pb-0">
        <div className="p-4 md:p-8 max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom Nav for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe transition-colors duration-200">
        <div className="flex justify-around p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 transition-colors ${
                  isActive ? 'text-orange-600 dark:text-orange-400' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon size={24} />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
