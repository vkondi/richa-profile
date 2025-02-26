"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.css";

type MenuItem = {
  title: string;
  href?: string;
  items?: MenuItem[];
};

type HeaderProps = {
  title: string;
  menuItems: MenuItem[];
};

const Header: React.FC<HeaderProps> = ({
  title = "Header Title",
  menuItems = [],
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Check if the screen width is less than or equal to 768px
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage the drawer visibility
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // State to manage the open dropdown
  const [hydrated, setHydrated] = useState(false); // State to manage hydration
  const drawerRef = useRef<HTMLDivElement>(null); // Ref for the drawer
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown

  useEffect(() => {
    setHydrated(true); // Set hydrated to true after the component mounts
  }, []);

  useEffect(() => {
    // Function to handle clicks outside the drawer or dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false); // Close the drawer if clicked outside
      }
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add event listener for clicks outside
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, []);

  if (!hydrated) {
    return null; // Return null if not hydrated to avoid hydration mismatch
  }

  return (
    <header className={styles.container}>
      <Link href="/">
        <div className={isMobile ? styles.titleCenter : styles.titleLeft}>
          {title}
        </div>
      </Link>

      {isMobile ? (
        <button
          className={styles.menuButton}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)} // Toggle drawer visibility
        >
          ☰
        </button>
      ) : (
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <div key={item.title} className={styles.menuItem}>
              {item.items ? (
                <div
                  className={styles.dropdown}
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.title ? null : item.title
                    )
                  }
                  ref={dropdownRef}
                >
                  {item.title} ▾
                  {openDropdown === item.title && (
                    <div className={styles.dropdownMenu}>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href || "#"}
                          className={styles.dropdownItem}
                          onClick={() => setOpenDropdown(null)} // Close dropdown on item click
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href || "#"} className={styles.navLink}>
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      )}

      {isMobile && isDrawerOpen && (
        <div className={styles.drawer} ref={drawerRef}>
          <button
            className={styles.closeButton}
            onClick={() => setIsDrawerOpen(false)} // Close drawer on button click
          >
            ✕
          </button>
          {menuItems.map((item) => (
            <div key={item.title} className={styles.drawerItem}>
              {item.items ? (
                <details>
                  <summary>{item.title}</summary>
                  <div className={styles.drawerSubmenu}>
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href || "#"}
                        className={styles.drawerLink}
                        onClick={() => setIsDrawerOpen(false)} // Close drawer on item click
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={styles.drawerLink}
                  onClick={() => setIsDrawerOpen(false)} // Close drawer on item click
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;