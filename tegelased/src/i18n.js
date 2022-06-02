import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ee: {
    translation: {  
        "navbar.home-button": "Avaleht",
        "navbar.selected-chars-button": "Valitud tegelased",
        "navbar.add-char-button": "Lisa tegelane",
        "navbar.cars-button": "Autod",
        "char.select-char-button": "Vali",
        "char.delete-all-button": "Kustuta kõik tegelased",
        "char.add-char-button": "Lisa",
        "char.remove-char-button": "Eemalda",
        "char.selected-chars": "Valitud tegelasi",
        "char.no-selected-chars": "Ei ole valitud ühtegi tegelast",
        "body.pay-button": "MAKSMA",
        "char.total-age": "Kogu vanus",
        "char.first-name": "Eesnimi",
        "char.last-name": "Perekonnanimi",
        "char.location": "Asukoht",
        "char.age": "Vanus",
        "char.new-char-button": "Sisesta"
    }
  },
  en: {
    translation: {
        "navbar.home-button": "Home",
        "navbar.selected-chars-button": "Selected characters",
        "navbar.add-char-button": "Add a character",
        "navbar.cars-button": "Cars",
        "char.select-char-button": "Select",
        "char.delete-all-button": "Delete all characters",
        "char.add-char-button": "Add",
        "char.remove-char-button": "Remove",
        "char.selected-chars": "Selected characters",
        "char.no-selected-chars": "No characters have been selected",
        "body.pay-button": "PAY",
        "char.total-age": "Total age",
        "char.first-name": "First name",
        "char.last-name": "Last name",
        "char.location": "Location",
        "char.age": "Age",
        "char.new-char-button": "Submit"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language") || "ee", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;