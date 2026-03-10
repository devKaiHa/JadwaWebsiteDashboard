import ProtectedRoute from "./ProtectedRoute";
import { Navigate, Route, Routes } from "react-router";
import { DefaultPage } from "@/pages/dashboards";

import { AuthPage } from "@/auth";
import { Demo6Layout } from "@/layouts/demo6";
import { ErrorsRouting } from "@/errors";
//dashboard
import Service from "../modules/Dashboard/Service";

import AllBlogs from "../modules/Blogs/blog/components/allBlogs";
import AllMembers from "../modules/Board Members/components/allMembers";
import AllServices from "../modules/Home/OurServices/components/allServices";
import Companies from "../modules/Companies/components/AllCompanies";
import BlogsDashboard from "../modules/Dashboard/Blog";
import AddBlog from "../modules/Blogs/blog/components/AddBlog";
import AllCateogryBlogs from "../modules/Blogs/BlogCategory/components/AllCateogryBlogs";
import UpdateBlog from "../modules/Blogs/blog/components/UpdateBlog";
import AddService from "../modules/Home/OurServices/components/AddService";
import SliderCardsList from "../modules/Home/Slider/components/SliderCardsList";
import AddSliderCard from "../modules/Home/Slider/components/AddSliderCard";
import SectorsList from "../modules/Home/Sectors/components/SectorsList";
import AddSectors from "../modules/Home/Sectors/components/AddSector";
import FooterUpdate from "../modules/Home/Footer/FooterUpdate";
import AboutUsUpdate from "../modules/Home/AboutUs/components/AboutUsList";
import AboutServicesUpdate from "../modules/service/about/components/AboutServidesUpdate";
import UpdateHomeSector from "../modules/Home/Sectors/components/UpdateSector";
import CompaniesList from "../modules/Home/companies/components/CompaniesList";
import FundsList from "../modules/Home/funds/components/FundsList";
import AddFund from "../modules/Home/funds/components/AddFund";
import CountriesList from "../modules/Home/countries/components/allCountries";
import AllPartners from "../modules/partner/components/allPartners";
import AddHomeCompany from "../modules/Home/companies/components/AddCompany";
import FundAddDashboard from "../modules/funds/components/AddFund";
import FundsListPage from "../modules/funds/components/FundsList";
import AddEmployee from "../modules/Board Members/components/AddMember";
import ContactDashboard from "../modules/Contact/components/UpdateContact";
import UpdateSliderCard from "../modules/Home/Slider/components/UpdateSliderCard";
import UpdateService from "../modules/Home/OurServices/components/UpdateService";
import UpdateFund from "../modules/Home/funds/components/UpdateFund";
import ValuesList from "../modules/Home/Values/components/ValuesList";
import AddValues from "../modules/Home/Values/components/AddValues";
import UpdateValues from "../modules/Home/Values/components/UpdateValues";
import StrategicDirectionsUpdate from "../modules/service/StrategicDirections/components/StrategicDirectionsUpdate";
import PlansUpdate from "../modules/service/Plans/components/PlansUpdate";
import FundUpdateDashboard from "../modules/funds/components/UpdateFund";
import UpdateEmployee from "../modules/Board Members/components/UpdateMembers";

//Turkish
import TurkishAboutUs from "../modules/Turkish Citzenship/About/components/AboutList";
import AllTurkishAdvantage from "../modules/Turkish Citzenship/Advantage/components/allAdvantage";
import AllTurkishInvest from "../modules/Turkish Citzenship/Invest/components/allInvest";
import AllTurkishQuestions from "../modules/Turkish Citzenship/Question/components/allQuestion";
import AllTurkishService from "../modules/Turkish Citzenship/TurkishService/components/allService";
import AddCompany from "../modules/Companies/components/AddCompanyDetail";

//investment gates
import InvestmentHeader from "../modules/InvestmentGates/header/headerList";
import InvestmentService from "../modules/InvestmentGates/investService/components/allInvest";
import InvestmentPartner from "../modules/InvestmentGates/partners/components/allPartner";
import InvestmentStage from "../modules/InvestmentGates/stages/components/allStage";
import InvestmentWhyUs from "../modules/InvestmentGates/whyUs/components/allChooseUs";
import AddInvest from "../modules/InvestmentGates/investService/components/AddInvest";
import UpdateInvest from "../modules/InvestmentGates/investService/components/updateInvest";
import UpdateChooseUs from "../modules/InvestmentGates/whyUs/components/updateChooseUs";
import AddChooseUs from "../modules/InvestmentGates/whyUs/components/AddChooseUs";
import AddPartner from "../modules/InvestmentGates/partners/components/AddPartner";
import updatePartner from "../modules/InvestmentGates/partners/components/updatePartner";
import UpdatePartnerCard from "../modules/InvestmentGates/partners/components/updatePartner";

import AddTurkishAdvantage from "../modules/Turkish Citzenship/Advantage/components/AddAdvantage";
import AddInvestment from "../modules/Turkish Citzenship/Invest/components/AddInvest";
import AddQuestoin from "../modules/Turkish Citzenship/Question/components/AddQuestion";
import AddTurkishService from "../modules/Turkish Citzenship/TurkishService/components/AddService";
import UpdateTurkishAdvantage from "../modules/Turkish Citzenship/Advantage/components/updateModal";
import UpdateInvestment from "../modules/Turkish Citzenship/Invest/components/updateModal";
import EditQuestion from "../modules/Turkish Citzenship/Question/components/updateModal";
import UpdateTurkishService from "../modules/Turkish Citzenship/TurkishService/components/updateModal";
import ManegeCompanySlider from "../modules/Companies/components/ManegeCompanySlider";
import AddStagePage from "../modules/InvestmentGates/stages/components/AddStage";
import UpdateStagePage from "../modules/InvestmentGates/stages/components/updateModal";
import UpdateCompanyDetail from "../modules/Companies/components/UpdateCompanyDetail";
import AddInvestPortfolio from "../modules/InvestPortfolio/components/AddInvestPortfolio";
import UpdateInvestPortfolio from "../modules/InvestPortfolio/components/UpdateInvestPortfolio";
import ListInvestPortfolio from "../modules/InvestPortfolio/components/ListInvestPortfolio";

const AppRoutingSetup = () => {
  return (
    <Routes>
      {/*  ProtectedRoute */}
      <Route element={<ProtectedRoute redirectTo="/auth/login" />}>
        <Route element={<Demo6Layout />}>
          <Route path="/" element={<DefaultPage />} />

          {/* dashboards */}
          <Route path="/dashboard-service" element={<Service />} />
          <Route path="/dashboard-blogs" element={<BlogsDashboard />} />

          {/* Home page  */}
          <Route path="/home-slider-list" element={<SliderCardsList />} />
          <Route path="/home-add-slider-list" element={<AddSliderCard />} />
          <Route
            path="/home-update-slider-list/:id"
            element={<UpdateSliderCard />}
          />
          <Route path="/home-all_sectors" element={<SectorsList />} />
          <Route path="/home-add_sector" element={<AddSectors />} />
          <Route path="/home-update_service/:id" element={<UpdateService />} />
          <Route
            path="/home-update_sector/:id"
            element={<UpdateHomeSector />}
          />
          <Route path="/home-about" element={<AboutUsUpdate />} />
          <Route path="/home-all_funds" element={<FundsList />} />
          <Route path="/home-add_funds" element={<AddFund />} />
          <Route path="/home-update_fund/:id" element={<UpdateFund />} />
          <Route path="/home-companies" element={<CompaniesList />} />
          <Route
            path="/home-add_company/:id/:name"
            element={<AddHomeCompany />}
          />
          <Route path="/home-all_countries" element={<CountriesList />} />
          <Route path="/home-all-values" element={<ValuesList />} />
          <Route path="/home-add-values" element={<AddValues />} />
          <Route path="/home-update-values/:id" element={<UpdateValues />} />

          {/* service Page */}
          <Route path="/service-about" element={<AboutServicesUpdate />} />
          <Route
            path="/service-Strategic-directions"
            element={<StrategicDirectionsUpdate />}
          />
          <Route path="/service-Plans" element={<PlansUpdate />} />

          {/* funds page */}
          <Route path="/all-funds" element={<FundsListPage />} />
          <Route path="/add-fund" element={<FundAddDashboard />} />
          <Route path="/update-fund/:id" element={<FundUpdateDashboard />} />

          {/* member */}
          <Route path="/all-members" element={<AllMembers />} />
          <Route path="/add-member" element={<AddEmployee />} />
          <Route path="/update-member/:id" element={<UpdateEmployee />} />

          {/* Investment Portfolio */}
          <Route
            path="/all-invest-portfolio"
            element={<ListInvestPortfolio />}
          />
          <Route
            path="/add-invest-portfolio"
            element={<AddInvestPortfolio />}
          />
          <Route
            path="/update-invest-portfolio/:id"
            element={<UpdateInvestPortfolio />}
          />

          {/* turkish citzenship Page */}
          <Route path="/turkish-about" element={<TurkishAboutUs />} />
          <Route path="/turkish-advantage" element={<AllTurkishAdvantage />} />
          <Route
            path="/turkish-add-advantage"
            element={<AddTurkishAdvantage />}
          />
          <Route
            path="/turkish-update-advantage/:id"
            element={<UpdateTurkishAdvantage />}
          />
          <Route path="/turkish-invest" element={<AllTurkishInvest />} />
          <Route path="/turkish-add-invest" element={<AddInvestment />} />
          <Route
            path="/turkish-update-invest/:id"
            element={<UpdateInvestment />}
          />
          <Route path="/turkish-questions" element={<AllTurkishQuestions />} />
          <Route path="/turkish-add-questions" element={<AddQuestoin />} />
          <Route
            path="/turkish-update-questions/:id"
            element={<EditQuestion />}
          />
          <Route path="/turkish-service" element={<AllTurkishService />} />
          <Route path="/turkish-add-service" element={<AddTurkishService />} />
          <Route
            path="/turkish-update-service/:id"
            element={<UpdateTurkishService />}
          />

          {/* investment gates Page */}
          <Route path="/investment-header" element={<InvestmentHeader />} />
          <Route path="/investment-service" element={<InvestmentService />} />
          <Route path="/investment-partner" element={<InvestmentPartner />} />

          <Route path="/investment-stage" element={<InvestmentStage />} />
          <Route path="/investment-add-stage" element={<AddStagePage />} />
          <Route
            path="/investment-update-stage/:id"
            element={<UpdateStagePage />}
          />

          <Route path="/investment-whyus" element={<InvestmentWhyUs />} />
          <Route path="/investment-add-service" element={<AddInvest />} />
          <Route path="/investment-add-chooseUs" element={<AddChooseUs />} />
          <Route
            path="/investment-update-partner/:id"
            element={<UpdatePartnerCard />}
          />
          <Route path="/investment-add-partner" element={<AddPartner />} />
          <Route
            path="/investment-update-chooseUs/:id"
            element={<UpdateChooseUs />}
          />
          <Route
            path="/investment-update-service/:id"
            element={<UpdateInvest />}
          />
          <Route
            path="/investment-update-service/:id"
            element={<UpdateInvest />}
          />
          <Route
            path="/investment-update-service/:id"
            element={<UpdateInvest />}
          />

          {/* company page  */}
          <Route path="/all-companies" element={<Companies />} />
          <Route path="/add-company" element={<AddCompany />} />
          <Route path="/update-company/:id" element={<UpdateCompanyDetail />} />
          <Route path="/company-slider/:id" element={<ManegeCompanySlider />} />

          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/all-services" element={<AllServices />} />
          <Route path="/all-partners" element={<AllPartners />} />
          <Route path="/blogs/add_blog" element={<AddBlog />} />
          <Route path="/blogs/update_blog/:id" element={<UpdateBlog />} />
          <Route path="/blog-categories" element={<AllCateogryBlogs />} />
          <Route path="/add_service" element={<AddService />} />

          <Route path="/footer" element={<FooterUpdate />} />

          {/* Contact page */}
          <Route path="/contact-us" element={<ContactDashboard />} />
        </Route>
      </Route>

      {/* الصفحات العامة */}
      <Route path="error/*" element={<ErrorsRouting />} />
      <Route path="auth/*" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { AppRoutingSetup };
