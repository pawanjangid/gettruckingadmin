import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Riders from "views/examples/Riders";
import Drivers from "views/examples/Drivers";
import ManageDocuments from "views/examples/ManageDocuments";
import VehicleType from "views/examples/VehicleType";
import ManageAds from "views/examples/ManageAds";
import DiscountAndCoupon from "views/examples/DiscountAndCoupon";
import WalletBalance from "views/examples/WalletBalance";
import Documents from "views/examples/Documents";
import ManageFare from "views/examples/ManageFare";
import Country from "views/examples/Country";
import Trips from "views/examples/Trips";
import Admins from "views/examples/Admins";
import Payout from "views/examples/Payout";
import Comming from "views/examples/Comming";
import Settings from "views/examples/Settings";
import Reasons from "views/examples/Reasons";
import DriverRides from "views/examples/DriverRides"
import ProfileUser from "views/examples/ProfileUser"
import Statics from "views/examples/Statics";
var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/admins",
    name: "Manage admin",
    icon: "ni ni-circle-08 text-red",
    component: Admins,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/drivers",
    name: "Manage Drivers",
    icon: "ni ni-single-02 text-yellow",
    component: Drivers,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/Riders",
    name: "Manage Riders",
    icon: "ni ni-user-run text-green",
    component: Riders,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/Profile/:user_id",
    name: "Profile",
    icon: "ni ni-bullet-list-67 text-red",
    component: Profile,
    layout: "/admin",
    visibility : false
  },
  {
    path: "/ProfileUser/:user_id",
    name: "Profile",
    icon: "ni ni-bullet-list-67 text-red",
    component: ProfileUser,
    layout: "/admin",
    visibility : false
  },
  {
    path: "/DriverRides/:user_id",
    name: "Profile",
    icon: "ni ni-bullet-list-67 text-red",
    component: DriverRides,
    layout: "/admin",
    visibility : false
  },
  {
    path: "/ManageDocuments",
    name: "Manage Documents",
    icon: "ni ni-books text-yellow",
    component: ManageDocuments,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/Documents/:driver_id",
    name: "Documets",
    icon: "ni ni-bullet-list-67 text-red",
    component: Documents,
    layout: "/admin",
    visibility : false
  },

  {
    path: "/VehicleType",
    name: "Manage Vehicle Type",
    icon: "ni ni-delivery-fast text-lightblue",
    component: VehicleType,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/banner",
    name: "Manage Ad Banner",
    icon: "ni ni-image text-red",
    component: ManageAds,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/wallet_balance",
    name: "Wallet Management",
    icon: "ni ni-credit-card text-blue",
    component: WalletBalance,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/reasons",
    name: "Manage Cancel Reason",
    icon: "ni ni-fat-remove text-red",
    component: Reasons,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/manageFare",
    name: "Manage Fare",
    icon: "ni ni-tag text-green",
    component: ManageFare,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/trips",
    name: "Manage Trips",
    icon: "ni ni-books text-blue",
    component: Trips,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/Payouts",
    name: "Manage Payouts",
    icon: "ni ni-credit-card text-green",
    component: Payout,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/statement",
    name: "Manage Statement",
    icon: "ni ni-folder-17 text-red",
    component: Statics,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/coupon",
    name: "Manage Discount & Promo",
    icon: "ni ni-spaceship text-green",
    component: DiscountAndCoupon,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/maps",
    name: "Manage Map",
    icon: "ni ni-map-big text-yellow",
    component: Maps,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/country",
    name: "Manage Country",
    icon: "ni ni-bullet-list-67 text-red",
    component: Country,
    layout: "/admin",
    visibility : true
  },
  
  {
    path: "/Help",
    name: "Manage Help & Support",
    icon: "ni ni-chat-round text-green",
    component: Comming,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-ui-04 text-red",
    component: Settings,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
