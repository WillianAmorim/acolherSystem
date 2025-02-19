
import "./Navbar.css";

import { LuChevronDown } from "react-icons/lu";

interface Option {
  title: string;
  url: string;
  items?: Option[];
}

interface NavbarProps {
  navOptions: Option[];
  vertical?: boolean;
  submenu?: boolean;
}

export default function Navbar({ navOptions, vertical=false, submenu=false }: NavbarProps) {
  return (
    <nav className={`hidden h-full ${submenu && "submenu"}`}>
      <ul className={`flex justify-center h-full min-w-full
        ${vertical && "flex-col items-center min-h-max bg-white shadow-lg absolute top-full left-0 justify-around pb-2"}`}
      >
        {navOptions?.map((option, index) => (
          <li key={index} className="w-full">
            <div 
              className={`flex h-full min-w-full w-max items-center relative 
                px-4 hover:text-blue-500
                ${vertical && "py-2 hover:bg-blue-100 pl-8 text-zinc-900"}
                ${option.items && "has-options"}`}
            >
              <a href={option.url}>
                {option.title}
              </a>
              { option.items && <LuChevronDown size={12} /> }
              { option.items && <Navbar navOptions={option.items} vertical submenu /> }
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
