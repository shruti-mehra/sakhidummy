import { Home, Users, History, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

function BottomNav() {
  const links = [
    {
      to: "/home",
      label: "Home",
      icon: Home,
    },
    {
      to: "/contacts",
      label: "Contacts",
      icon: Users,
    },
    {
      to: "/history",
      label: "History",
      icon: History,
    },
    {
      to: "/profile",
      label: "Profile",
      icon: UserCircle,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-2xl justify-around py-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex min-w-[70px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs ${
                isActive
                  ? "font-semibold text-rose-600"
                  : "text-gray-500"
              }`
            }
          >
            <Icon size={21} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;