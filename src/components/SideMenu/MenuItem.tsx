
import { LuBanana } from "react-icons/lu";

interface MenuItemProps {
  text?: string;
  Icon?: React.ComponentType;
  handleClick?: () => void;
}

export default function MenuItem({ text="MenuItem", Icon=LuBanana, handleClick }: MenuItemProps) {
  return (
    <li className="transition duration-300 ease transform hover:bg-emerald-50">
      <button 
        className="flex items-center gap-6 py-3 px-6 w-full transition duration-200 ease-in-out active:bg-emerald-300"
        onClick={ handleClick }
      >
        <Icon />
        <h3>{ text }</h3>
      </button>
    </li>
  )
}
