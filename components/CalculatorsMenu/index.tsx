"use client";

import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CALCULATOR_LINKS } from "@utils/constants";

const CalculatorsMenu = () => {
  return (
    <Menu as="div" className="relative">
      <MenuButton className="bg-transparent-200 text-xs md:text-xl">
        Calculators
      </MenuButton>

      <MenuItems className="absolute mt-2 w-48 bg-white shadow-lg right-0 md:right-auto">
        {CALCULATOR_LINKS.map((link) => (
          <MenuItem key={link.href} as="div">
            {({ close, active }) => (
              <div
                onClick={close}
                className={`bg-gray-800 block ${
                  active ? "bg-red-100 text-black" : "text-white"
                } p-3 whitespace-wrap overflow-hidden`}
              >
                <Link
                  href={link.href}
                  className="text-xs md:text-sm lg:text-sm"
                >
                  {link.label}
                </Link>
              </div>
            )}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default CalculatorsMenu;
