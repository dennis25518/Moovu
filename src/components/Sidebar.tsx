import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MdHome,
  MdMovie,
  MdTv,
  MdBookmark,
  MdLogout,
  MdPerson,
  MdSearch,
} from "react-icons/md";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Home", icon: <MdHome size={24} />, path: "/" },
  { label: "Movies", icon: <MdMovie size={24} />, path: "/movies" },
  { label: "TV Shows", icon: <MdTv size={24} />, path: "/tv" },
  { label: "Watchlist", icon: <MdBookmark size={24} />, path: "/watchlist" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = false; // TODO: Add auth context

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const assetBaseUrl = import.meta.env.BASE_URL || "/";
  const logoUrl = encodeURI(`${assetBaseUrl}assets/Moove web nav.png`);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-black/95 backdrop-blur-sm border-r border-white/10 transition-all duration-300 z-40 flex flex-col ${
          isExpanded ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-24 border-b border-white/10 px-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-full"
          >
            <img
              src={logoUrl}
              alt="Moovu logo"
              className="h-16 w-auto object-contain"
            />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="relative">
            <input
              type="text"
              placeholder={isExpanded ? "Search..." : ""}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition-colors text-sm ${
                isExpanded ? "" : "text-center"
              }`}
            />
            <MdSearch
              className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none ${
                isExpanded ? "right-3" : "left-1/2 -translate-x-1/2"
              }`}
              size={18}
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-2 p-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive(item.path)
                  ? "text-white bg-red-500/20 border border-red-500/30"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <span
                className={`flex-shrink-0 text-xl transition-colors ${
                  isActive(item.path)
                    ? "text-red-500"
                    : "group-hover:text-red-500"
                }`}
              >
                {item.icon}
              </span>
              {isExpanded && (
                <span className="font-medium text-sm whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-white/10 p-4 space-y-2">
          {isLoggedIn ? (
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group">
              <span className="flex-shrink-0 text-xl group-hover:text-red-500 transition-colors">
                <MdLogout size={24} />
              </span>
              {isExpanded && (
                <span className="font-medium text-sm">Logout</span>
              )}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300 group"
            >
              <span className="flex-shrink-0 text-xl">
                <MdPerson size={24} />
              </span>
              {isExpanded && <span className="text-sm">Sign in</span>}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
