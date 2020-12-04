import store from '@/store'
import Payment from '@/views/admin/Payments'
import PaymentForm from '@/views/admin/Payments/form'
import PaymentShow from '@/views/admin/Payments/show'
// import PaymentEdit from '@/views/admin/Payments/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Payments = [

  {path: "/payments",component: Payment, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/payments/create",component: PaymentForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/payments/show/:id",component: PaymentShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  // {path: "/Payments/:id/edit",component: PaymentEdit, beforeEnter(to, from, next) {
  //   if (token && isadmin){
  //     next()
  //   }else{
  //     next('/')
  //   }
  // }},
]
