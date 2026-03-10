import {
  LayoutProvider,
  LoadersProvider,
  MenusProvider,
  SettingsProvider,
  TranslationProvider,
} from "@/providers";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "../rtk/store";
const ProvidersWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <SettingsProvider>
        <TranslationProvider>
          <HelmetProvider>
            <LayoutProvider>
              <LoadersProvider>
                <MenusProvider>{children}</MenusProvider>
              </LoadersProvider>
            </LayoutProvider>
          </HelmetProvider>
        </TranslationProvider>
      </SettingsProvider>
    </Provider>
  );
};
export { ProvidersWrapper };
