import store from '@/store'
import Payment from '@/views/admin/Payments'
import PaymentForm from '@/views/admin/Payments/form'
import PaymentExpence from '@/views/admin/Payments/expence'
import PaymentShow from '@/views/admin/Payments/show'
import PaymentAllocation from '@/views/admin/Paymentsallocation'
import PaymentAllocationExpence from '@/views/admin/Paymentsallocation/expence'
import PaymentAllocationShow from '@/views/admin/Paymentsallocation/show'
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

  {path: "/payments/create/expence",component: PaymentExpence, beforeEnter(to, from, next) {
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
  {path: "/payments/allocation",component: PaymentAllocation, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/payments/allocation/expence",component: PaymentAllocationExpence, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/payments/allocation/:code",component: PaymentAllocationShow, beforeEnter(to, from, next) {
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
