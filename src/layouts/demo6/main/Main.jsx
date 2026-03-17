import { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router";
import { useMenuCurrentItem } from "@/components/menu";
import {
  Footer,
  Header,
  Sidebar,
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from "../";
import { useMenus } from "@/providers";
import { useResponsive } from "@/hooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { KeenIcon } from "@/components/keenicons";

const Main = () => {
  const mobileMode = useResponsive("down", "lg");
  const { pathname } = useLocation();
  const { getMenuConfig } = useMenus();
  const menuConfig = getMenuConfig("primary");
  const menuItem = useMenuCurrentItem(pathname, menuConfig);

  const today = new Date();
  const [date] = useState(today);

  return (
    <Fragment>
      <Helmet>
        <title>{menuItem?.title}</title>
      </Helmet>

      <div className="flex grow">
        <Sidebar />
        {mobileMode && <Header />}

        <div className="flex flex-col lg:flex-row grow pt-[--tw-header-height] lg:pt-0">
          <div className="flex flex-col grow items-stretch rounded-xl bg-[--tw-content-bg] dark:bg-[--tw-content-bg-dark] border border-gray-300 dark:border-gray-200 lg:ms-[--tw-sidebar-width] mt-0 lg:mt-[15px] m-[15px]">
            <div className="flex flex-col grow lg:scrollable-y-auto lg:[scrollbar-width:auto] lg:light:[--tw-scrollbar-thumb-color:var(--tw-content-scrollbar-color)] pt-5">
              <main className="grow" role="content">
                <Toolbar>
                  <ToolbarHeading />

                  <ToolbarActions>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          id="date"
                          className={cn(
                            "btn btn-sm btn-light data-[state=open]:bg-light-active",
                            !date && "text-gray-400",
                          )}
                        >
                          <KeenIcon icon="calendar" className="me-0.5" />
                          {date ? (
                            format(date, "LLL dd, y")
                          ) : (
                            <span>Today</span>
                          )}
                        </button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar mode="single" selected={date} month={today} />
                      </PopoverContent>
                    </Popover>
                  </ToolbarActions>
                </Toolbar>

                <Outlet />
              </main>

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export { Main };
