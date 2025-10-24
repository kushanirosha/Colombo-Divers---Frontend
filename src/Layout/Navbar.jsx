import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Nav2 from "../components/Nav2";
import { useTranslation } from "react-i18next";

function Navbar() {
  const [atTop, setAtTop] = useState(true);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setAtTop(y < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("packages"), path: "/packages" },
    { name: t("gallery"), path: "/gallery" },
    { name: t("about"), path: "/about" },
    { name: t("contact"), path: "/contact" },
  ];

  return (
    <>
      <Nav2 />
      <nav
        className={`w-full fixed z-40 transition-all duration-200 ${
          atTop ? "top-10 bg-white shadow-sm" : "top-0 bg-[#F5EFE6] shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px]">
          {/* Left: Company Name */}
          <div className="text-2xl font-bold text-[#0D1164]">Colombo Divers</div>

          {/* Center: Navigation Links */}
          <ul className="flex items-center gap-10 text-base font-medium text-gray-700">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative transition-all hover:text-[#0D1164] ${
                    location.pathname === item.path ? "text-[#0D1164]" : ""
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#0D1164] rounded-full"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right: Book Now Button */}
          <button
            onClick={() => (window.location.href = "http://localhost:5173/packages")}
            className="bg-[#0D1164] text-white px-5 py-2 font-medium hover:bg-[#0D1144] transition"
          >
            Book Now
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
