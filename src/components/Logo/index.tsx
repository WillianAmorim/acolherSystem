
import logo from "/logo.png";

interface LogoProps {
  className?: string;
}

export default function Logo({ className="" }: LogoProps) {
  return (
    <div className={ className }>
      <img src={ logo } className="w-full h-[70px] object-contain"></img>
    </div>
  );
}
