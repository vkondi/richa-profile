"use client";

import { ReactNode, useCallback } from "react";
import styles from "./styles.module.css";
import CalculatorLogo from "@/components/layouts/CalculatorWrapper/CalculatorLogo";
import { CALCULATOR_LINKS } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import Popup from "@/components/Popup";
import { usePopupContext } from "@/context/PopupContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { isOpen: isPopupOpen, setOpen } = usePopupContext();
  const pathname = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const renderBottomNavLinks = useCallback(() => {
    return CALCULATOR_LINKS.slice(0, isMobile ? 4 : 5)
      .filter((link) => link.href.indexOf(pathname) === -1)
      .map((link) => {
        return (
          <CalculatorLogo
            href={link.href}
            key={link.href}
            label={link.label}
            logoUrl={link.logoUrl}
          />
        );
      });
  }, [pathname, isMobile]);

  return (
    <div>
      <main>{children}</main>

      {/* Bottom Div */}
      <div className={styles.calculatorFooter}>{renderBottomNavLinks()}</div>

      {/* Popup overlay */}
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setOpen(false)}
        title="Important Information"
      >
        <p>
          This is the content of the popup. You can include any React components
          here.
        </p>
        <p>Click outside the popup or press the ESC key to close it.</p>
        <button onClick={() => setOpen(false)}>Confirm</button>
      </Popup>
    </div>
  );
}
