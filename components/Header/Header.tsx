"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import styles from "./Header.module.css";

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
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={isMobile ? styles.titleCenter : styles.titleLeft}>
          {title}
        </div>
      </Link>

      {isMobile ? (
        <button
          className={styles.menuButton}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
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
                >
                  {item.title} ▾
                  {openDropdown === item.title && (
                    <div className={styles.dropdownMenu}>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href || "#"}
                          className={styles.dropdownItem}
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
        <div className={styles.drawer}>
          <button
            className={styles.closeButton}
            onClick={() => setIsDrawerOpen(false)}
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
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link href={item.href || "#"} className={styles.drawerLink}>
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