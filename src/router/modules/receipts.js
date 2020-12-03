import store from '@/store'
import Receipt from '@/views/admin/Receipts'
import ReceiptForm from '@/views/admin/Receipts/form'
import ReceiptShow from '@/views/admin/Receipts/show'
// import ReceiptEdit from '@/views/admin/Receipts/edit'


var token = store.getters.Token
var isadmin = store.getters.isadmin = true
export const Receipts = [

  {path: "/receipts",component: Receipt, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  {path: "/receipts/create",component: ReceiptForm, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},

  {path: "/receipts/show/:id",component: ReceiptShow, beforeEnter(to, from, next) {
    if (token && isadmin){
      next()
    }else{
      next('/')
    }
  }},
  // {path: "/receipts/:id/edit",component: ReceiptEdit, beforeEnter(to, from, next) {
  //   if (token && isadmin){
  //     next()
  //   }else{
  //     next('/')
  //   }
  // }},
]
