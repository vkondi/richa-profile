import Image from "next/image";
import Link from "next/link";

import "./styles.css";
import { useCallback, useEffect, useState } from "react";

type CalculatorLogoProps = {
  href: string;
  label: string;
  logoUrl: string;
};

const CalculatorLogo = ({ href, label, logoUrl }: CalculatorLogoProps) => {
  const [deviceWidth, setDeviceWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getImageDimensions = useCallback(() => {
    if (deviceWidth < 480) {
      // Mobile: smaller image
      return { width: 20, height: 20 };
    } else if (deviceWidth < 650) {
      // Tablet: medium
      return { width: 40, height: 40 };
    } else if (deviceWidth < 1025) {
      // Tablet: large
      return { width: 60, height: 60 };
    } else {
      // Desktop: larger image
      return { width: 80, height: 80 };
    }
  }, [deviceWidth]);

  const { width, height } = getImageDimensions();

  return (
    <Link href={href} className="calculator-logo-container">
      <Image
        src={logoUrl}
        alt={label}
        width={width}
        height={height}
        className="mx-auto"
      />
      {label}
    </Link>
  );
};

export default CalculatorLogo;
