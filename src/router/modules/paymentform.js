import store from '@/store'
import Paymentform from '@/views/admin/Paymentform'
import PaymentformForm from '@/views/admin/Paymentform/form'
import PaymentformShow from '@/views/admin/Paymentform/show'
import PaymentformEdit from '@/views/admin/Paymentform/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Paymentforms = [

  {path: "/paymentform",component: Paymentform, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/paymentform/create",component: PaymentformForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/paymentform/show/:id",component: PaymentformShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/paymentform/:id/edit",component: PaymentformEdit, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
]
