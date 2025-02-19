import Sidemenu from "../SideMenu";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { LuAlignJustify } from "react-icons/lu";

export default function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger>
        <LuAlignJustify size={70} className="ml-4" />
      </SheetTrigger>
      <SheetContent side="left">
        <Sidemenu />
      </SheetContent>
    </Sheet>
  )
}
