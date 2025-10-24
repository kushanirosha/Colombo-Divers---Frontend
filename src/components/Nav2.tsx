import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaUser } from "react-icons/fa";
import { Select, MenuItem, FormControl, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ApiService from "../services/ApiService";

type Nav2Props = {
  sticky?: boolean;
  className?: string;
};

const Nav2: React.FC<Nav2Props> = ({ sticky = true, className = "" }) => {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const goingDown = y > lastY.current;
      if (y < 16) setHidden(false);
      else if (goingDown && y > 80) setHidden(true);
      else if (!goingDown) setHidden(false);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll as EventListener);
  }, []);

  const containerStyles = useMemo<React.CSSProperties>(
    () => ({
      position: sticky ? "sticky" : "static",
      top: 0,
      zIndex: 50,
      width: "100%",
      backgroundColor: "#1B1C52",
      color: "#ffffff",
      transform: hidden ? "translateY(-100%)" : "translateY(0)",
      transition: "transform 240ms ease, opacity 240ms ease",
      opacity: hidden ? 0 : 1,
    }),
    [sticky, hidden]
  );

  const [language, setLanguage] = useState<string>(localStorage.getItem("language") || "en");

  const handleChange = (event: SelectChangeEvent<string>) => {
    const lang = event.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <nav style={containerStyles} className={`${className}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between h-10 text-sm font-medium">
        {/* LEFT: Hotline + Social Icons */}
        <div className="flex items-center gap-6 text-[#E7E7F3]">
          <a href="tel:+94112345657" className="hover:text-white transition">
            Tourism Hotline: +94 11 234 5657 
          </a>
          <p>|</p>
          <div className="flex items-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* RIGHT: Language Selector + Auth */}
        <div className="flex items-center gap-4">
          <FormControl variant="standard" sx={{ minWidth: 100 }}>
            <Select
              value={language}
              onChange={handleChange}
              displayEmpty
              sx={{
                color: "#E7E7F3",
                fontWeight: 600,
                "& .MuiSelect-icon": { color: "#E7E7F3" },
                "&:before": { borderBottom: "none" },
                "&:after": { borderBottom: "none" },
              }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="dv">Dhivehi</MenuItem>
            </Select>
          </FormControl>

          {ApiService.isAuthenticated() ? (
            <Link to="/dashboard" className="flex items-center gap-1 hover:text-gray-200 transition">
              <FaUser /> {t("Profile")}
            </Link>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 transition">
                {t("signIn")}
              </Link>
              <Link to="/signup" className="hover:text-gray-200 transition">
                {t("Register")}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav2;
