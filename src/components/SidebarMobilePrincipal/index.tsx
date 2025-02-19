import { Minus, Plus } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import Header from "../Header";
import Logo from "../Logo";

import navOptions from "../../data/navOptions";
import { Link } from "react-router-dom";

interface sidebarProps {
  children?: React.ReactNode;
}

export function SidebarMobile({ children }: sidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="bg-[#FFF]  ">
          <Logo className=" flex justify-start items-start" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navOptions.map((item, index) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={index === 1}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <Link to={item.url}>
                        <SidebarMenuButton>

                          <div className="flex items-center gap-x-[20px] text-base text-[#575757]">
                            <i className={item.icon}></i>
                            <a className="text-[14px]" href={item.url}>{item.title}</a>
                          </div>

                          {/* {item.title}{" "} */}
                          {item.items?.length && (
                            <div className="ml-auto">
                              <Plus className="group-data-[state=open]/collapsible:hidden" />
                              <Minus className="group-data-[state=closed]/collapsible:hidden" />
                            </div>
                          )}
                        </SidebarMenuButton>
                      </Link>
                    </CollapsibleTrigger>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton
                                asChild
                              >
                                <a href={item.url}>{item.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>

        <main className="">
          <Header isMobile />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
