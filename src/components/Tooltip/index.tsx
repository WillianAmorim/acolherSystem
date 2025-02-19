
import "./Tooltip.css";

interface TooltipProps {
  children: React.ReactNode;
  text?: string;
  hidden?: boolean;
}

export default function Tooltip({
  children,
  text = "tooltip here",
  hidden = false,
}: TooltipProps) {
  return (
    <div className="tooltip">
      {children}
      <span
        style={{ display: hidden ? "none" : "block" }}
        className="invisible absolute right-[50%] translate-x-[50%] opacity-0 top-[100%] 
        tooltip-text text-white bg-zinc-600 px-2 py-[6px] rounded-md text-xs"
      >
        {text}
      </span>
    </div>
  );
}
