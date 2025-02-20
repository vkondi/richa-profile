// components/Header.tsx
import Link from "next/link";
import CalculatorsMenu from "../CalculatorsMenu";

const Header = () => {
  return (
    <header className="flex justify-around items-center p-4 bg-gray-800 text-white">
      <Link href="/">
        <h1 className="text-xl md:text-4xl font-bold">
          Vagmi Richa Vishwajeet
        </h1>
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <CalculatorsMenu />
          </li>
          <li>
            <Link href="/about" className="text-xs md:text-xl">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
