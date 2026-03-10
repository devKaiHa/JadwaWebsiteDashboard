import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// api import
import { AuthApi } from "./AuthApi/authApi";
import { ServiceApi } from "./Service/ServiceApi";
import { BlogApi } from "./Blog/BlogApi";
import { PartnerApi } from "./Partners/PartnersApi";
import { TeamApi } from "./employees/EmployeesApi";
import { BlogCategoryApi } from "./Blog/BlogCateoryApi";

//title
import { TitleApi } from "./title/TitleApi";

//Home Page
import { HomeSliderApi } from "./Home/Slider/HomeSliderApi";
import { AboutHomeApi } from "./Home/about/aboutApi";
import { HomeSectorsApi } from "./Home/sectors/HomeSectorsApi";
import { FooterApi } from "./Home/footer/FooterApi";
import { FundsApi } from "./Home/funds/FundsApi";
import { HomeCompaniesApi } from "./Home/companies/CompaniesApi";
import { CountriesApi } from "./Home/countries/CountriesApi";
import { CompanyNameApi } from "./Home/companies/CompanyNameApi";
import { ValuesApi } from "./Home/values/valuesApi";
//service page
import { AboutServiceApi } from "./ServicePage/about/AboutServiceApi";
import { StratgicApi } from "./ServicePage/Stratgic/StratgicApi";
import { PlansApi } from "./ServicePage/plans/PlansApi";

//funds pags
import { FundsPageApi } from "./funds/FundsPageApi";

//member section
import { MembersApi } from "./members/MembersApi";
//contact
import { ContactApi } from "./Contact/contactApi";

//Turkish citzenship
import { AboutApi } from "./Turkish Citzenship/About/aboutApi";
import { AdvantageApi } from "./Turkish Citzenship/Advantage/advantageApi";
import { InvestApi } from "./Turkish Citzenship/investOptions/investApi";
import { QuestionApi } from "./Turkish Citzenship/Question/questionApi";
import { ServiceTApi } from "./Turkish Citzenship/Service/serviceApi";

//company page
import { CompanyPageApi } from "./Companies/CompaniesApi";
import { CompanyDetailPageApi } from "./Companies/CompaniesDetailApi";
//Investment Gates

import { ChooseUsApi } from "./investmentGates/chooseUsApi/chooseUsApi";
import { HeaderApi } from "./investmentGates/headerApi/headerApi";
import { InvestServiceApi } from "./investmentGates/investServiceApi/investServiceApi";
import { InvestPartnerApi } from "./investmentGates/partnersApi/partnersApi";
import { StagesApi } from "./investmentGates/stagesApi/stagesApi";
import { InvestPortfolioApi } from "./InvestPortfolio/InvestPortfolioApi";

const store = configureStore({
  reducer: {
    // Auth Reducers
    [AuthApi.reducerPath]: AuthApi.reducer,
    [ServiceApi.reducerPath]: ServiceApi.reducer,
    [BlogApi.reducerPath]: BlogApi.reducer,
    [PartnerApi.reducerPath]: PartnerApi.reducer,
    [TeamApi.reducerPath]: TeamApi.reducer,
    [BlogCategoryApi.reducerPath]: BlogCategoryApi.reducer,

    [TitleApi.reducerPath]: TitleApi.reducer,

    //Home Page
    [HomeSliderApi.reducerPath]: HomeSliderApi.reducer,
    [HomeSectorsApi.reducerPath]: HomeSectorsApi.reducer,
    [FooterApi.reducerPath]: FooterApi.reducer,
    [FundsApi.reducerPath]: FundsApi.reducer,
    [HomeCompaniesApi.reducerPath]: HomeCompaniesApi.reducer,
    [AboutHomeApi.reducerPath]: AboutHomeApi.reducer,
    [CountriesApi.reducerPath]: CountriesApi.reducer,
    [CompanyNameApi.reducerPath]: CompanyNameApi.reducer,
    [ValuesApi.reducerPath]: ValuesApi.reducer,

    //service page
    [AboutServiceApi.reducerPath]: AboutServiceApi.reducer,
    [StratgicApi.reducerPath]: StratgicApi.reducer,
    [PlansApi.reducerPath]: PlansApi.reducer,

    //funds page
    [FundsPageApi.reducerPath]: FundsPageApi.reducer,

    //member
    [MembersApi.reducerPath]: MembersApi.reducer,

    //contact
    [ContactApi.reducerPath]: ContactApi.reducer,

    //turkish citzenship

    [ServiceTApi.reducerPath]: ServiceTApi.reducer,
    [InvestApi.reducerPath]: InvestApi.reducer,
    [AboutApi.reducerPath]: AboutApi.reducer,
    [AdvantageApi.reducerPath]: AdvantageApi.reducer,
    [QuestionApi.reducerPath]: QuestionApi.reducer,

    //company page
    [CompanyPageApi.reducerPath]: CompanyPageApi.reducer,
    [CompanyDetailPageApi.reducerPath]: CompanyDetailPageApi.reducer,

    //investment gates
    [ChooseUsApi.reducerPath]: ChooseUsApi.reducer,
    [HeaderApi.reducerPath]: HeaderApi.reducer,
    [InvestServiceApi.reducerPath]: InvestServiceApi.reducer,
    [InvestPartnerApi.reducerPath]: InvestPartnerApi.reducer,
    [StagesApi.reducerPath]: StagesApi.reducer,
    [InvestPortfolioApi.reducerPath]: InvestPortfolioApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(ServiceApi.middleware)
      .concat(BlogApi.middleware)
      .concat(PartnerApi.middleware)
      .concat(BlogCategoryApi.middleware)

      .concat(TitleApi.middleware)

      //Home Page
      .concat(HomeSliderApi.middleware)
      .concat(AboutHomeApi.middleware)
      .concat(HomeSectorsApi.middleware)
      .concat(FooterApi.middleware)
      .concat(FundsApi.middleware)
      .concat(HomeCompaniesApi.middleware)
      .concat(CountriesApi.middleware)
      .concat(CompanyNameApi.middleware)
      .concat(ValuesApi.middleware)

      //service page
      .concat(AboutServiceApi.middleware)
      .concat(StratgicApi.middleware)
      .concat(PlansApi.middleware)

      //funds pags
      .concat(FundsPageApi.middleware)

      //member
      .concat(MembersApi.middleware)

      //contact
      .concat(ContactApi.middleware)

      //turkish citzenship
      .concat(AboutApi.middleware)
      .concat(AdvantageApi.middleware)
      .concat(InvestApi.middleware)
      .concat(ServiceTApi.middleware)
      .concat(QuestionApi.middleware)

      //investment gates
      .concat(StagesApi.middleware)
      .concat(InvestPartnerApi.middleware)
      .concat(InvestServiceApi.middleware)
      .concat(HeaderApi.middleware)
      .concat(ChooseUsApi.middleware)

      //company page
      .concat(CompanyPageApi.middleware)
      .concat(CompanyDetailPageApi.middleware)
      .concat(InvestPortfolioApi.middleware),
});
setupListeners(store.dispatch);
export default store;
