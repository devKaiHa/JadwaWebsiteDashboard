import { forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuArrow,
  MenuIcon,
  MenuItem,
  MenuLabel,
  MenuLink,
  MenuSub,
  MenuTitle,
} from "@/components/menu";
import { MENU_ROOT } from "@/config";
import { KeenIcon } from "@/components";
import { useLanguage } from "@/i18n";
import logo from "../../../assets/logo.webp";

const SidebarHeader = forwardRef((props, ref) => {
  const { isRTL } = useLanguage();

  return (
    <div ref={ref}>
      <div className="flex items-center gap-2.5 px-3.5 h-[70px]">
        <Link to="/">
          <img src={logo} className="dark:hidden h-[42px]" />
        </Link>

        <Menu className="menu-default grow">
          <MenuItem
            className="grow"
            toggle="dropdown"
            trigger="hover"
            dropdownProps={{
              placement: isRTL() ? "bottom-end" : "bottom-start",
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 15], // [skid, distance]
                  },
                },
              ],
            }}
          >
            <MenuLabel className="cursor-pointer text-gray-900 font-medium grow justify-between">
              <span className="text-base font-medium text-gray-900 grow justify-start">
                Jadwa Dashboard
              </span>
              <MenuArrow>
                <KeenIcon icon="down" />
              </MenuArrow>
            </MenuLabel>
            <MenuSub className="menu-default w-48 py-2">
              {MENU_ROOT.map((item, index) => (
                <MenuItem key={index}>
                  <MenuLink path={item.path}>
                    {item.icon && (
                      <MenuIcon>
                        <KeenIcon icon={item.icon} />
                      </MenuIcon>
                    )}
                    <MenuTitle>{item.title}</MenuTitle>
                  </MenuLink>
                </MenuItem>
              ))}
            </MenuSub>
          </MenuItem>
        </Menu>
      </div>

      <div className="pt-2.5 px-3.5 mb-1">
        <div className="input">
          <KeenIcon icon="magnifier" />
          <input
            placeholder="Search"
            type="text"
            className="min-w-0"
            value=""
          />
        </div>
      </div>
    </div>
  );
});
export { SidebarHeader };
