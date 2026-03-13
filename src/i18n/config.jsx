import arMessages from "./messages/ar.json";
import enMessages from "./messages/en.json";
import syriaFlag from "../assets/syria.jpg";
import ukFlag from "../assets/uk.png";

const I18N_MESSAGES = {
  en: enMessages,
  ar: arMessages,
};
const I18N_CONFIG_KEY = "i18nConfig";
const I18N_LANGUAGES = [
  {
    label: "English",
    code: "en",
    direction: "ltr",
    flag: syriaFlag,
    messages: I18N_MESSAGES.en,
  },
  {
    label: "Arabic (Syria)",
    code: "ar",
    direction: "rtl",
    flag: ukFlag,
    messages: I18N_MESSAGES.ar,
  },
];
const I18N_DEFAULT_LANGUAGE = I18N_LANGUAGES[0];
export {
  I18N_CONFIG_KEY,
  I18N_DEFAULT_LANGUAGE,
  I18N_LANGUAGES,
  I18N_MESSAGES,
};
