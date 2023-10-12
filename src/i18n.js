import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
        "Email address or phone number": "Email address or phone number",
        "Password": "Password",
        "Log in": "Log in",
        "or": "or",
        "Forgotten password ?": "Forgotten password ?",
        "Create new account": "Create new account",
        "About us • Help • See more": "About us • Help • See more",
        "Help": "Help",
        "See more": "See more"
        }
    },
    vi: {
        translation: {
        "Email address or phone number": "Địa chỉ email hoặc số điện thoại",
        "Password": "Mật khẩu",
        "Log in": "Đăng nhập",
        "or": "hoặc",
        "Forgotten password ?": "Quên mật khẩu ?" ,
        "Create new account": "Tạo tài khoản mới",
        "About us • Help • See more": "Giới thiệu • Trợ giúp • Xem thêm",
        "Help": "Trợ giúp",
        "See more": "Xem thêm"
        }
    }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;