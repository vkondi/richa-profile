// components/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-around items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Richa Sharma K</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/tools">Tools</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
