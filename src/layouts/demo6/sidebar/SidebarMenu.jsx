import { SidebarMenuPrimary, SidebarMenuSecondary } from "./";
const SidebarMenu = ({ height = 0 }) => {
  return (
    <div className="flex items-stretch grow shrink-0 justify-center my-5">
      <div
        className="scrollable-y-auto light:[--tw-scrollbar-thumb-color:var(--tw-content-scrollbar-color)] grow"
        style={{
          ...(height > 0 && {
            height: `${height}px`,
          }),
        }}
      >
        <SidebarMenuPrimary type="main_menu" />
        <div className="border-b border-gray-300 mt-4 mb-1 mx-3.5"></div>
        <SidebarMenuPrimary type="modules" />
        <div className="border-b border-gray-300 mt-4 mb-1 mx-3.5"></div>
        <SidebarMenuPrimary type="settings" />
        {/* <SidebarMenuSecondary /> */}
      </div>
    </div>
  );
};
export { SidebarMenu };
