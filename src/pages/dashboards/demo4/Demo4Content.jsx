import { Fragment } from "react";
import { MiscCreateTeam } from "@/partials/misc";
import jadwaLightEn from "../../../assets/jadwa-en-light.png";
import jadwaDarkEn from "../../../assets/jadwa-en-dark.png";
import jadwaLightAr from "../../../assets/jadwa-ar-light.png";
import jadwaDarkAr from "../../../assets/jadwa-ar-dark.png";
import { useLanguage } from "@/i18n";

const Demo4Content = () => {
  const { currentLanguage: curLng } = useLanguage();

  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7.5 items-stretch">
        <div className="lg:col-span-2">
          <MiscCreateTeam
            image={
              <Fragment>
                <img
                  src={curLng.code === "ar" ? jadwaDarkAr : jadwaDarkEn}
                  className="dark:hidden max-h-[120px]"
                  alt=""
                />
                <img
                  src={curLng.code === "ar" ? jadwaLightAr : jadwaLightEn}
                  className="light:hidden max-h-[120px]"
                  alt=""
                />
              </Fragment>
            }
            className="h-full"
            title="Welcome to Jadwa Invest dashboard"
            subTitle={
              <Fragment>
                Manage the Jadwa Website content easily with this dashboard
              </Fragment>
            }
          />
        </div>
      </div>
    </div>
  );
};
export { Demo4Content };
