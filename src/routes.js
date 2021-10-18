import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
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
    icon: "ni ni-planet text-blue",
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
    icon: "ni ni-bullet-list-67 text-red",
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
    path: "/ManageDocuments",
    name: "Manage Documents",
    icon: "ni ni-bullet-list-67 text-red",
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
    icon: "ni ni-bullet-list-67 text-red",
    component: VehicleType,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/banner",
    name: "Manage Ad Banner",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageAds,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/wallet_balance",
    name: "Wallet Management",
    icon: "ni ni-bullet-list-67 text-red",
    component: WalletBalance,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/additional",
    name: "Aditional Reason",
    icon: "ni ni-bullet-list-67 text-red",
    component: Comming,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/reasons",
    name: "Manage Cancel Reason",
    icon: "ni ni-bullet-list-67 text-red",
    component: Comming,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/Locations",
    name: "Manage Location",
    icon: "ni ni-bullet-list-67 text-red",
    component: Comming,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/manageFare",
    name: "Manage Fare",
    icon: "ni ni-bullet-list-67 text-red",
    component: ManageFare,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/trips",
    name: "Manage Trips",
    icon: "ni ni-bullet-list-67 text-red",
    component: Trips,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/Payouts",
    name: "Manage Payouts",
    icon: "ni ni-bullet-list-67 text-red",
    component: Payout,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/statement",
    name: "Manage Statement",
    icon: "ni ni-bullet-list-67 text-red",
    component: Comming,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/coupon",
    name: "Manage Discount & Promo",
    icon: "ni ni-bullet-list-67 text-red",
    component: DiscountAndCoupon,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/maps",
    name: "Manage Map",
    icon: "ni ni-bullet-list-67 text-red",
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
    path: "/currency",
    name: "Manage Currency",
    icon: "ni ni-bullet-list-67 text-red",
    component: Comming,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/Help",
    name: "Manage Help & Support",
    icon: "ni ni-bullet-list-67 text-red",
    component: Comming,
    layout: "/admin",
    visibility : true
  },
  {
    path: "/tables",
    name: "Settings",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
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
