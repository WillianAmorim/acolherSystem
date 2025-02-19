import { IconType } from "react-icons/lib";
import { LuBanana, LuChevronDown, LuChevronUp } from "react-icons/lu";

import "./buttonPop.css";
import { useState, useRef, useEffect } from "react";
import Tooltip from "../Tooltip";

interface buttonProps {
  Icon?: IconType;
  children?: React.ReactNode;
  tooltip?: string;
  type?: string;
}

export default function ButtonPopup({ children, Icon=LuBanana, tooltip=undefined, type="default" }: buttonProps) {

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const Indicator = showPopup ? LuChevronUp : LuChevronDown;

  return (
    <div  
      className="relative z-50"
    >
      <Tooltip text={tooltip} hidden={!tooltip}>
        <button 
          disabled={showPopup}
          className={`${type === "little" && "bg-blue-200 rounded-md p-1"} flex items-center text-blue-500`} 
          onClick={handleClick}
          >
          <Icon size={type === "little" ? 18 : 24} />
          { type !== "little" && <Indicator size={12} /> }
        </button>
      </Tooltip>
      <div 
        className={`w-full h-full absolute top-0 cursor-pointer`}
        style={{ zIndex: showPopup ? 1 : -1 }}
      >
      </div>
      <div 
        ref={popupRef}
        className={`absolute bg-white right-0 min-h-4 min-w-44 popup rounded-md drop-shadow-lg`}
        style={{
          opacity: showPopup ? 1 : 0,
          top: showPopup ? "168%" : "100%"
        }}
      >
        { children }
      </div>
    </div>
  );
}
