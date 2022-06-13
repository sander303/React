import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    ee: {
        translation: {
          "Welcome to React": "Tere tulemast Reacti",
          "navbar.admin-button": "Admin vaatesse",
          "navbar.cart-button": "Ostukorvi",
          "addproduct.added": "Toode edukalt lisatud",
          "form.name": "Nimi",
          "navbar.shops-button": "Poed",
          "sort.AZ": "Sorteeri A-Z",
          "sort.ZA": "Sorteeri Z-A",
          "sort.priceAsc": "Sorteeri hind kasvavalt",
          "sort.priceDesc": "Sorteeri hind kahanevalt",
          "home.addToCart": "Lisa ostukorvi",
          "cart.empty ": "Tühjenda korv ",
          "cart.sum": "Summa:",
          "cart.pay": "Maksma",
          "shops.all-shops": "Kõik poed",
          "admin.manage-shops": "Halda poode",
          "admin.add-product": "Lisa toode",
          "admin.manage-categories": "Halda kategooriaid",
          "admin.manage-products": "Halda tooteid",
          "shops.name": "Poe nimi",
          "shops.openHrs": "Poe lahtiolekuaeg",
          "shops.latitude": "Poe laiuskraadid",
          "shops.longitude": "Poe pikkuskraadid",
          "shops.add-btn": "Lisa",
          "products.edit": "Muuda",
          "form.description": "Kirjeldus",
          "form.category": "Kategooria",
          "form.price": "Hind",
          "form.picture": "Pilt",
          "form.Active": "Aktiivne",
          "form.enter": "Sisesta",
          "category.name": "Nimi",
          "category.enter": "Sisesta",
          "product.notFound": "Toodet ei leitud",
          "page.notFound": "Lehekülge ei leitud",
          "category.delete": "Kustuta",
          "category.added-categories": "Lisatud kategooriad",
          "selected.backBtn": "Tagasi"
        }
    },
    en: {
        translation: {
        "Welcome to React": "Welcome to React and react-i18next",
        "navbar.admin-button": "To admin view",
        "navbar.cart-button": "Cart",
        "addproduct.added": "Product added successfully",
        "form.name": "Name",
        "navbar.shops-button": "Shops",
        "sort.AZ": "Sort A-Z",
        "sort.ZA": "Sort Z-A",
        "sort.priceAsc": "Sort by price ascending",
        "sort.priceDesc": "Sort by price descending",
        "home.addToCart": "Add to cart",
        "cart.empty ": "Empty cart ",
        "cart.sum": "Total:",
        "cart.pay": "Purchase",
        "shops.all-shops": "All shops",
        "admin.manage-shops": "Manage shops",
        "admin.add-product": "Add a product",
        "admin.manage-categories": "Manage categories",
        "admin.manage-products": "Manage products",
        "shops.name": "Shop name",
        "shops.openHrs": "Shop open hours",
        "shops.latitude": "Shop latitude",
        "shops.longitude": "Shop longitude",
        "shops.add-btn": "Add",
        "products.edit": "Edit",
        "form.description": "Description",
        "form.category": "Category",
        "form.price": "Price",
        "form.picture": "Picture",
        "form.Active": "Active",
        "form.enter": "Enter",
        "category.name": "Name",
        "category.enter": "Enter",
        "product.notFound": "Product not found",
        "page.notFound": "Page not found",
        "category.delete": "Delete",
        "category.added-categories": "Added categories",
        "selected.backBtn": "Return"
        }
    },
    fr: {
        translation: {
        "Welcome to React": "Bienvenue à React et react-i18next",
        "navbar.admin-button": "Admin vaatesse FR",
        "navbar.cart-button": "Ostukorvi FR",
        "addproduct.added": "Toode edukalt lisatud FR",
        "form.name": "Nimi FR",
        "navbar.shops-button": "Poed FR",
        "sort.AZ": "Sorteeri A-Z FR",
        "sort.ZA": "Sorteeri Z-A FR",
        "sort.priceAsc": "Sorteeri hind kasvavalt FR",
        "sort.priceDesc": "Sorteeri hind kahanevalt FR",
        "home.addToCart": "Lisa ostukorvi FR",
        "cart.empty ": "Tühjenda korv FR ",
        "cart.sum": "Summa FR:",
        "cart.pay": "Maksma FR",
        "shops.all-shops": "Kõik poed FR",
        "admin.manage-shops": "Halda poode FR",
        "admin.add-product": "Lisa toode FR",
        "admin.manage-categories": "Halda kategooriaid FR",
        "admin.manage-products": "Halda tooteid FR",
        "shops.name": "Poe nimi FR",
        "shops.openHrs": "Poe lahtiolekuaeg FR",
        "shops.latitude": "Poe laiuskraadid FR",
        "shops.longitude": "Poe pikkuskraadid FR",
        "shops.add-btn": "Lisa FR",
        "products.edit": "Muuda FR",
        "form.description": "Kirjeldus FR",
        "form.category": "Kategooria FR",
        "form.price": "Hind FR",
        "form.picture": "Pilt FR",
        "form.Active": "Aktiivne FR",
        "form.enter": "Sisesta FR",
        "category.name": "Nimi FR",
        "category.enter": "Sisesta FR",
        "product.notFound": "Toodet ei leitud FR",
        "page.notFound": "Lehekülge ei leitud FR",
        "category.delete": "Kustuta",
        "category.added-categories": "Lisatud kategooriad FR",
        "selected.backBtn": "Tagasi FR"
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