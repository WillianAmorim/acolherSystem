import { useState } from "react";
import { SidebarMobile } from "@/components/SidebarMobile";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Usando window.matchMedia diretamente no estado
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  if (mediaQuery.matches !== isMobile) {
    setIsMobile(mediaQuery.matches);
  }

  return (
    <>
     <SidebarMobile>{children}</SidebarMobile>
    </>
  );
}
