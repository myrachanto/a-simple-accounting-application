import store from '@/store'
import Dashboard from '@/views/admin/Reports/Sales/Dashboard'
import Expences from '@/views/admin/Reports/Sales/Expences'
import Customers from '@/views/admin/Reports/Sales/Customers'


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
]
