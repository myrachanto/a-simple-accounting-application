import store from '@/store'
import Customer from '@/views/admin/Customers'
import CustomerForm from '@/views/admin/Customers/form'
import CustomerShow from '@/views/admin/Customers/show'
import CustomerEdit from '@/views/admin/Customers/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const customers = [
  {path: "/customer",component: Customer, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/customer/create",component: CustomerForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/customer/show/:id",component: CustomerShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/customer/:id/edit",component: CustomerEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
