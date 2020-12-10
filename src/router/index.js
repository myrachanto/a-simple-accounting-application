import Vue from "vue";
import VueRouter from "vue-router";
import {front} from "./modules/front"
import {auth} from "./modules/auth"
import {general} from "./modules/general"
import {customers} from "./modules/customers"
import {Suppliers} from "./modules/supplier"
import {Products} from "./modules/product"
import {Categorys} from "./modules/category"
import {Majorcats} from "./modules/majorcat"
import {CustInvoice} from "./modules/customerinvoice"
import {Taxs} from "./modules/tax"
import {Discounts} from "./modules/discounts"
import {Prices} from "./modules/prices"
import {Paymentforms} from "./modules/paymentform"
import {sales} from "./modules/sales"
import {Expences} from "./modules/expence"
import {Receipts} from "./modules/receipts"
import {SupInvoice} from "./modules/suppierinvoice"
import {Payments} from "./modules/payments"
import {Liabilitys} from "./modules/liability"
import {Assets} from "./modules/asset"
import {Users} from "./modules/user"
import {ExpenceTrans} from "./modules/expencestran"

Vue.use(VueRouter);

const routes = [
  ...front,
  ...auth,
  ...general,
  ...customers,
  ...Suppliers,
  ...Products,
  ...Categorys,
  ...Majorcats,
  ...CustInvoice,
  ...Taxs,
  ...Discounts,
  ...Prices,
  ...Paymentforms,
  ...sales,
  ...Expences,
  ...Receipts,
  ...SupInvoice,
  ...Payments,
  ...Liabilitys,
  ...Assets,
  ...Users,
  ...ExpenceTrans

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
