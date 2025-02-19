
import { IconType } from "react-icons/lib";
import { LuBanana } from "react-icons/lu";

interface buttonProps {
  Icon?: IconType;
}

export default function LittleButton({ Icon=LuBanana }: buttonProps) {
  return (
    <button className="bg-blue-200 p-1 rounded-md text-blue-500">
      <Icon size={18} />
    </button>
  )
}
