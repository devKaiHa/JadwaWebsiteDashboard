import React, { forwardRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toAbsoluteUrl } from '@/utils';
import { Menu, MenuArrow, MenuIcon, MenuItem, MenuLabel, MenuLink, MenuSub, MenuTitle } from '@/components/menu';
import { MENU_ROOT } from '@/config';
import { KeenIcon } from '@/components';
import { useLanguage } from '@/i18n';
import useTokenValidation from '../../../utils/PrivateRoute';
const SidebarHeader = forwardRef((props, ref) => {
    const isTokenValid = useTokenValidation();

  const {
    pathname
  } = useLocation();
  const [selectedMenuItem, setSelectedMenuItem] = useState(MENU_ROOT[1]);
  const {
    isRTL
  } = useLanguage();
  const handleInputChange = () => {};
  useEffect(() => {
    MENU_ROOT.forEach(item => {
      if (item.rootPath && pathname.includes(item.rootPath)) {
        setSelectedMenuItem(item);
      }
    });
  }, [pathname]);


  //   if (!isTokenValid) {
  //   return (
  //    <div className="fixed top-5 right-5 z-50 w-[370px]  rounded-lg p-4 space-y-2 ">
  //     <div
  //       key="expired"
  //       className="badge badge-outline badge-danger text-sm block"
  //     >
  //       <div className="font-medium">🔒 Session Expired</div>
  //       <div className="text-xs">Please log in again to continue</div>
  //     </div>{" "}
  //   </div>
  //   );
  // }


  return <div ref={ref}>
      <div className="flex items-center gap-2.5 px-3.5 h-[70px]">
        <Link to="/">
          <img src={"../../../../public/judy-favicon.ico"} className="dark:hidden h-[42px]" />
        </Link>

        <Menu className="menu-default grow">
          <MenuItem className="grow" toggle="dropdown" trigger="hover" dropdownProps={{
          placement: isRTL() ? 'bottom-end' : 'bottom-start',
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 15] // [skid, distance]
            }
          }]
        }}>
            <MenuLabel className="cursor-pointer text-gray-900 font-medium grow justify-between">
              <span className="text-base font-medium text-gray-900 grow justify-start">
               JUDY Dashboard 
              </span>
              <MenuArrow>
                <KeenIcon icon="down" />
              </MenuArrow>
            </MenuLabel>
            <MenuSub className="menu-default w-48 py-2">
              {MENU_ROOT.map((item, index) => <MenuItem key={index} className={item === selectedMenuItem ? 'active' : ''}>
                  <MenuLink path={item.path}>
                    {item.icon && <MenuIcon>
                        <KeenIcon icon={item.icon} />
                      </MenuIcon>}
                    <MenuTitle>{item.title}</MenuTitle>
                  </MenuLink>
                </MenuItem>)}
            </MenuSub>
          </MenuItem>
        </Menu>
      </div>

      <div className="pt-2.5 px-3.5 mb-1">
        <div className="input">
          <KeenIcon icon="magnifier" />
          <input placeholder="Search" type="text" onChange={handleInputChange} className="min-w-0" value="" />
          <span className="text-2sm text-gray-700 text-nowrap">cmd + /</span>
        </div>
      </div>
    </div>;
});
export { SidebarHeader };