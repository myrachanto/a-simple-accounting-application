import store from '@/store'
import Dashboard from '@/views/admin/Reports/Sales/Dashboard'
import Expences from '@/views/admin/Reports/Sales/Expences'
import Customers from '@/views/admin/Reports/Sales/Customers'
import Suppliers from '@/views/admin/Reports/Sales/Suppliers'
import Receipts from '@/views/admin/Reports/Sales/Receipts'
import Payments from '@/views/admin/Reports/Sales/Payments'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const sales = [
  {path: "/sales/dashboard",component: Dashboard, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/expences/report",component: Expences, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/customers/report",component: Customers, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/suppliers/report",component: Suppliers, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/receipts/report",component: Receipts, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/payments/report",component: Payments, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
