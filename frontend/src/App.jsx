import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from "./components/user/Spinner";
import OwnerDashboard from "./components/owner/OwnerDashboard";
import EditOffer from "./components/owner/Offers/EditOffer";
import ViewClaim from "./components/owner/ViewClaim";
import AdminDashboard from "./components/admin/AdminDashboard";
import OwnerRegistration from "./components/owner/Registration/OwnerRegistration";
import OwnerLogin from "./components/owner/OwnerLogin";
import ForgotPassword from "./components/owner/ForgotPassword";
import ViewShopOwner from "./components/admin/ViewShopOwner";
import ViewShopUser from "./components/admin/ViewShopUser";
import UserOffer from "./components/user/UserOffer";
import AllShops from "./components/user/AllShop";
import CommonOffer from "./components/user/CommonOffer";
import Home from "./components/user/Home/Home"
// import UserProfile from "./components/user/Profile/profile";
import OfferDetail from "./components/user/OfferD";
import Notification from "./components/user/Notification";
import ShopDetails from "./components/user/Shop";
import LocationSelection from "./components/user/Home/LocationSelection";
import AddCatalogs from "./components/owner/AddCatalog";
import CreateOfferPage from "./components/owner/AddOffer/CreateOfferPage";
import AccountPage from "./components/owner/Account/AccountPage";
import YourOffer from "./components/owner/Offers/YourOffer";
import ScanQRPage from "./components/owner/NavComponent/ScanQr";
import MyAds from "./components/owner/NavComponent/MyAds";
import BookingHistory from "./components/owner/DashComp/BookingHistory";
import RedemptionTracker from "./components/owner/DashComp/RedemptionTracker";
import SponsoredAds from "./components/owner/DashComp/SponsoredAds";
import MyStore from "./components/owner/MyStore/MyStore";
import EditHappyHourPage from "./components/owner/Offers/Edit/EditHappyOffer";
import SelectLocation from "./components/SelectLocation";
import ManualAddress from "./components/user/Home/ManualAddress";
import HelpPage from "./components/owner/Help/HelpPage";
import OwnerEditPage from "./components/owner/Account/StoreInfoEdit";
import LocationAndBranch from "./components/owner/Account/locationbranch";
import OwnerWallet from "./components/owner/Account/Wallet";
import BoostSpotlightOffer from "./components/owner/Offers/Boost/SpotlightBoost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/spinner/:ownerId" element={<Spinner />} />
        <Route path="/user-offers/:shopName/:ownerId" element={<UserOffer />} />
        <Route path="/All-shops" element={<AllShops />} />
        <Route path="/common-offers/:ownerId" element={<CommonOffer />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/youraccount" element={<UserProfile />} /> */}
        <Route path="/offer/:id" element={<OfferDetail />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/location" element={<LocationSelection />} />

        <Route path="/shop-owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/edit-offer/:offerId" element={<EditOffer />} />
        <Route path="/owner/view-redeemed/:userId" element={<ViewClaim />} />
        <Route path="/shop-owner-registration" element={<OwnerRegistration />} />
        <Route path="/shop-owner-login" element={<OwnerLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/shop-owner/add-catalogs" element={<AddCatalogs />} />
        <Route path="/shop-owner/create-offers" element={<CreateOfferPage />} />
        <Route path="/shop-owner/account" element={<AccountPage />} />
        <Route path="/shop-owner/your-offer" element={<YourOffer />} />
        <Route path="/shop-owner/scan-qr" element={<ScanQRPage />} />
        <Route path="/shop-owner/my-ads" element={<MyAds />} />
        <Route path="/shop-owner/booking-history" element={<BookingHistory />} />
        <Route path="/shop-owner/redemption-tracker" element={<RedemptionTracker />} />
        <Route path="/shop-owner/active-sponsored-Ads" element={<SponsoredAds />} />
        <Route path="/shop-owner/my-store" element={<MyStore />} />
        <Route path="/edit-happy-hour/:id" element={<EditHappyHourPage />} />
        <Route path="/select-location" element={<SelectLocation />} />
        <Route path="/manual-address" element={<ManualAddress />} />
        <Route path="/help-support" element={<HelpPage />} />
        <Route path="/shop-owner/edit" element={<OwnerEditPage />} />
        <Route path="/shop-owner/Locationandbranch" element={<LocationAndBranch />} />
        <Route path="/shop-owner/Wallet" element={<OwnerWallet />} />
        <Route path="/shop-owner/boost-spotlight/:offerId" element={<BoostSpotlightOffer />} />

        <Route path="/Offerwhisky-admin-dashboard" element={<AdminDashboard />} />
        <Route path="/Offeerwhisky-admin/viewshopowner" element={<ViewShopOwner />} />
        <Route path="/Offeerwhisky-admin/viewshopowner/viewusers/:ownerId" element={<ViewShopUser />} />

      </Routes>
    </Router>
  );
}

export default App;
