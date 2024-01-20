import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditAccount = lazy(() =>
  import("../components/account setting/EditAccount")
);
const ProviderLogin = lazy(() => import("../pages/provider/ProviderLogin"));
const ProviderRegister = lazy(() =>
  import("../pages/provider/ProviderRegister")
);
const ProviderVerifyOTP = lazy(() =>
  import("../pages/provider/ProviderVerifyOTP")
);
const ProviderResetPassword = lazy(() =>
  import("../pages/provider/ProviderResetPassword")
);
const ProviderCompanyInfo = lazy(() =>
  import("../pages/provider/ProviderCompanyInfo")
);
const Home = lazy(() => import("../pages/Home"));
const Messages = lazy(() => import("../pages/Messages"));
const Bookings = lazy(() => import("../pages/Bookings"));
const PaymentHistory = lazy(() => import("../pages/PaymentHistory"));
const MyManagers = lazy(() => import("../pages/MyManagers"));
const ViewAllSpaces = lazy(() => import("../pages/AllSpaces"));
const Login = lazy(() => import("../pages/customer/Login"));
const Register = lazy(() => import("../pages/customer/Register"));
const ManagerRegister = lazy(() => import("../pages/mangers/Mangerregister"));
const VerifyOTP = lazy(() => import("../pages/customer/VerifyOTP"));
const ForgetPassword = lazy(() => import("../pages/customer/ForgetPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const PersonalInfo = lazy(() => import("../pages/customer/PersonalInfo"));
const Notifications = lazy(() => import("../pages/Notifications"));
const Trucks = lazy(() => import("../pages/Trucks"));
const CompanyInfo = lazy(() => import("../pages/CompanyInfo"));
const SingleSpace = lazy(() => import("../pages/SingleSpace"));
const SingleSpaceCustomer = lazy(() => import("../pages/SingleSpaceCustomer"));
const DriverCompanyInfo = lazy(() => import("../pages/truck-driver/DriverCompanyInfo"));
const AccountPrivacyPolicy = lazy(() =>
  import("../components/account setting/AccountPrivacyPolicy")
);
const AccountFaqs = lazy(() =>
  import("../components/account setting/AccountFaqs")
);
const ChangeAccountPassword = lazy(() =>
  import("../components/account setting/ChangeAccountPassword")
);
const AccountSetting = lazy(() => import("../pages/AccountSetting"));
const CustomerHome = lazy(() => import("../pages/customer/Home"));
const NavigationRoutes = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const userRole = useSelector(state => state.user.user.role);

  const driverRoutes = <Routes>
    <Route exact path="/dashboard/trucks" element={<Trucks />}></Route>
    <Route exact path="/dashboard/messages" element={<Messages />}></Route>
    <Route exact path="/dashboard/bookings" element={<Bookings />}></Route>
    <Route
      exact
      path="/dashboard/payment-history"
      element={<PaymentHistory />}
    ></Route>
    <Route
      path="/settings/edit"
      element={
        <AccountSetting>
          <EditAccount />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/changepassword"
      element={
        <AccountSetting>
          <ChangeAccountPassword />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/faq"
      element={
        <AccountSetting>
          <AccountFaqs />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/privacy"
      element={
        <AccountSetting>
          <AccountPrivacyPolicy />
        </AccountSetting>
      }
    />

    <Route path="*" element={<Navigate to="/dashboard/trucks" />} />
  </Routes>

  const managerRoutes = <Routes>
    <Route exact path="/dashboard/messages" element={<Messages />}></Route>
    <Route exact path="/dashboard/bookings" element={<Bookings />}></Route>
    <Route
      exact
      path="/dashboard/payment-history"
      element={<PaymentHistory />}
    ></Route>
    <Route
      path="/settings/edit"
      element={
        <AccountSetting>
          <EditAccount />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/changepassword"
      element={
        <AccountSetting>
          <ChangeAccountPassword />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/faq"
      element={
        <AccountSetting>
          <AccountFaqs />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/privacy"
      element={
        <AccountSetting>
          <AccountPrivacyPolicy />
        </AccountSetting>
      }
    />

    <Route path="*" element={<Navigate to="/dashboard/bookings" />} />
  </Routes>


  const storageOwnerRoutes = <Routes>
    <Route exact path="/" element={<Home />}></Route>
    <Route
      exact
      path="/dashboard/all-spaces"
      element={<ViewAllSpaces />}
    ></Route>
    <Route
      exact
      path="/dashboard/single-space/:sid"
      element={<SingleSpace />}
    ></Route>
    <Route exact path="/dashboard/messages" element={<Messages />}></Route>
    <Route exact path="/dashboard/bookings" element={<Bookings />}></Route>
    <Route
      exact
      path="/dashboard/payment-history"
      element={<PaymentHistory />}
    ></Route>
    <Route
      exact
      path="/dashboard/my-managers"
      element={<MyManagers />}
    ></Route>
    <Route
      exact
      path="/dashboard/notifications"
      element={<Notifications />}
    ></Route>
    <Route
      path="/settings/edit"
      element={
        <AccountSetting>
          <EditAccount />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/changepassword"
      element={
        <AccountSetting>
          <ChangeAccountPassword />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/faq"
      element={
        <AccountSetting>
          <AccountFaqs />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/privacy"
      element={
        <AccountSetting>
          <AccountPrivacyPolicy />
        </AccountSetting>
      }
    />

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>

  const customerRoutes = <Routes>
    <Route exact 
      path="/customer" 
      element={<CustomerHome />}>
      </Route>
    <Route
      exact
      path="/dashboard/customer/single-space/:sid"
      element={<SingleSpaceCustomer />}
    ></Route>
    <Route exact path="/dashboard/messages" element={<Messages />}></Route>
    <Route exact path="/dashboard/bookings" element={<Bookings />}></Route>
    <Route
      exact
      path="/dashboard/payment-history"
      element={<PaymentHistory />}
    ></Route>
    <Route
      exact
      path="/dashboard/notifications"
      element={<Notifications />}
    ></Route>
    <Route
      path="/settings/edit"
      element={
        <AccountSetting>
          <EditAccount />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/changepassword"
      element={
        <AccountSetting>
          <ChangeAccountPassword />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/faq"
      element={
        <AccountSetting>
          <AccountFaqs />
        </AccountSetting>
      }
    />
    <Route
      path="/settings/privacy"
      element={
        <AccountSetting>
          <AccountPrivacyPolicy />
        </AccountSetting>
      }
    />

    <Route path="*" element={<Navigate to="/customer" />} />

    {/* customer */}
  </Routes>



  const routes = isLogin ? (
    userRole === 'Storage Owner' ? storageOwnerRoutes : userRole === 'Customer' ? customerRoutes : userRole === 'Manager' ? managerRoutes : userRole === 'Truck Driver' && driverRoutes
  ) : (
    <Routes>
      <Route exact path="/auth/login" element={<Login />}></Route>
      <Route
        exact
        path="/auth/customer/register"
        element={<Register />}
      ></Route>
      <Route
        exact
        path="/auth/customer/verify-otp"
        element={<VerifyOTP />}
      ></Route>
      <Route
        exact
        path="/auth/service-provider/login"
        element={<ProviderLogin />}
      ></Route>
      <Route
        exact
        path="/auth/service-provider/register"
        element={<ProviderRegister />}
      ></Route>
      <Route
        exact
        path="/auth/service-provider/verify-otp"
        element={<ProviderVerifyOTP />}
      ></Route>
      <Route
        exact
        path="/auth/service-provider/reset-password"
        element={<ProviderResetPassword />}
      ></Route>
      <Route
        exact
        path="/auth/service-provider/company-information"
        element={<ProviderCompanyInfo />}
      ></Route>
      <Route
        exact
        path="/auth/forget-password"
        element={<ForgetPassword />}
      ></Route>
      <Route
        exact
        path="/auth/reset-password"
        element={<ResetPassword />}
      ></Route>
      <Route
        exact
        path="/auth/personal-information"
        element={<PersonalInfo />}
      ></Route>
      <Route
        exact
        path="/auth/manager/register"
        element={<ManagerRegister />}
      ></Route>
      <Route
        exact
        path="/auth/company-information"
        element={<CompanyInfo />}
      ></Route>
      <Route
        exact
        path="/auth/driver/company-information"
        element={<DriverCompanyInfo />}
      ></Route>

      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );

  return routes;
};

export default NavigationRoutes;
